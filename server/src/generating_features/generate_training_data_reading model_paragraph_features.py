import os
import logging
import datetime
import pandas as pd
import numpy as np

from generate_training_data_convex_hull_features import FeatureExtractor
from server.src.data_loading import SciBotDataLoader, extract_paragraph_visits_vectorized
from server.src.features import extract_features, FixationEventWithReadingState, SaccadeEventWithReadingState

FONTSIZE = 20.5  # In Buscher's paper, their font size is 12pt, which is 16px
READING_DETECTOR_THRESHOLD = 30
SKIMMING_DETECTOR_THRESHOLD = 20

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def mapPixelSpaceToLetterSpace(v):
    return v / FONTSIZE


class SaccadeType(object):
    def __init__(self, saccade_distance_range, saccade_type_name, reading_detector_score, skimming_detector_score,
                 is_left_half_interval=True):
        """
        @param is_left_half_interval: if true, e.g [10, 20) else e.g (10, 20]
        """
        self._saccade_distance_range = saccade_distance_range
        self._saccade_type_name = saccade_type_name
        self._reading_detector_score = reading_detector_score
        self._skimming_detector_score = skimming_detector_score
        self._is_left_half_interval = is_left_half_interval

    def is_this_type(self, saccade_distance):
        if self._is_left_half_interval:
            return self._saccade_distance_range[0] <= saccade_distance < self._saccade_distance_range[1]
        else:
            return self._saccade_distance_range[0] < saccade_distance <= self._saccade_distance_range[1]

    @property
    def reading_detector_score(self):
        return self._reading_detector_score

    @property
    def skimming_detector_score(self):
        return self._skimming_detector_score

    @property
    def saccade_type(self):
        return self._saccade_type_name

    def is_reset_jump(self):
        return self.saccade_type == 'Reset Jump'


class UnrelatedSaccadeType(SaccadeType):
    def __init__(self):
        super(UnrelatedSaccadeType, self).__init__((float('-inf'), float('-inf')), 'Unrelated Move', 0, 0)


class ResetJumpSaccadeType(SaccadeType):
    def __init__(self, saccade_distance_max_value):
        super(ResetJumpSaccadeType, self).__init__((float('-inf'), saccade_distance_max_value), 'Reset Jump', 5, 5)


class SaccadeClassifier(object):
    def __init__(self):
        self._saccadeTypePools = list()
        self._init_type_pool()

    def _init_type_pool(self):
        self._saccadeTypePools.append(SaccadeType((0, 11), 'Read forward', 10, 5, False))
        self._saccadeTypePools.append(SaccadeType((11, 21), 'Skim forward', 5, 10, False))
        self._saccadeTypePools.append(SaccadeType((21, 30), 'Long Skim forward', -5, 8, False))
        self._saccadeTypePools.append(SaccadeType((-6, 0), 'Short Regression', -8, -8))
        self._saccadeTypePools.append(SaccadeType((-16, -6), 'Long Regression', -8, -8))
        # TODO:with current letter space threshold in the visit-based slice, could not find saccade that matches 'short regression' or 'long regression', need fine-tuning
        self._saccadeTypePools.append(ResetJumpSaccadeType(-16))

    def classify(self, saccade_distance):
        for aType in self._saccadeTypePools:
            if aType.is_this_type(saccade_distance):
                return aType
        return UnrelatedSaccadeType()


class SaccadeSequence(object):
    def __init__(self):
        self._saccades = list()
        self._reading_score = 0
        self._skimming_score = 0
        self._reading_state = None  # Readimg Or Skimming

    def append_saccade(self, saccade):
        self._reading_score += saccade.saccade_type.reading_detector_score
        self._skimming_score += saccade.saccade_type.skimming_detector_score
        self._saccades.append(saccade)

    def __len__(self):
        return len(self._saccades)

    def is_empty(self):
        return len(self._saccades) == 0

    @property
    def saccades(self):
        return self._saccades

    @property
    def reading_state(self):
        return self._reading_state

    @property
    def reading_score(self):
        return self._reading_score

    @property
    def skimming_score(self):
        return self._skimming_score

    def detect_reading_state(self):
        if self.reading_score > READING_DETECTOR_THRESHOLD and self.skimming_score > SKIMMING_DETECTOR_THRESHOLD:
            self._reading_state = "Reading" if self.reading_score > self.skimming_score else "Skimming"
            return
        if self.reading_score > READING_DETECTOR_THRESHOLD:
            self._reading_state = "Reading"
            return
        if self.skimming_score > SKIMMING_DETECTOR_THRESHOLD:
            self._reading_state = "Skimming"

    def broadcast_reading_state_to_saccades(self):
        for a_saccade in self.saccades:
            a_saccade.update_reading_state_for_fixation(self.reading_state)
            a_saccade.reading_state = str(self.reading_state)


# Todo rename sequences to slices or whatever
# in the visit-based method, name'saccade_sequences' should be modified into name'visit_slice' afterwards
def SeparateSaccadesToSequences(saccades):
    saccade_sequences = list()
    a_new_sequence = SaccadeSequence()
    saccade_sequences.append(a_new_sequence)
    for a_saccade in saccades:
        a_new_sequence.append_saccade(a_saccade)
        if a_saccade.saccade_type.is_reset_jump():
            a_new_sequence = SaccadeSequence()
            saccade_sequences.append(a_new_sequence)
    return saccade_sequences


def GroupFixationByParagraphID(fixations):
    results = dict()
    for a_fixation in fixations:
        results[a_fixation.paragraph_id]


class ReadingModelBasedFeatureExtractor(FeatureExtractor):

    def extract(self, p_visits):
        _p_visits = self._filter_visits(p_visits)
        if len(_p_visits) == 0:
            return []
        features = extract_features(p_visits=_p_visits)
        df = pd.DataFrame([features], index=[0])
        return [{
            # "visit": np.nan,
            "features": df
        }]


def extract_features(p_visits):
    features = dict()
    saccades_in_p = list()
    fixations_in_p = list()
    for v in p_visits:
        saccades, fixations = extract_reading_model(v.data)
        saccades_in_p += saccades
        fixations_in_p += fixations
    features.update(AverageFixationDuration().extract(fixations_in_p))
    features.update(AverageForwardSaccadesLength().extract(saccades_in_p))
    features.update(RegressionRatio().extract(saccades_in_p))
    features.update(ThoroughReadingRatio().extract(saccades_in_p))
    features.update(CoherentlyReadTextLength().extract(saccades_in_p))
    return features


def extract_reading_model(visit_df):
    fixations = FixationEventWithReadingState.from_dataframe(visit_df)
    saccades = SaccadeEventWithReadingState.from_fixations(fixations)
    saccades = reading_model_detection(saccades)
    return saccades, fixations


class AverageFixationDuration(object):

    def extract(self, fixations):
        average_fixation_duration = 0
        sum_of_fixation_duration = 0
        if len(fixations) != 0:
            for f in fixations:
                sum_of_fixation_duration += f.duration
            average_fixation_duration = sum_of_fixation_duration / len(fixations)

        return {"average_fixation_duration": average_fixation_duration}


class SaccadesFeatureExtractor(object):
    def extract(self, saccades):
        raise NotImplementedError


class AverageForwardSaccadesLength(SaccadesFeatureExtractor):
    def extract(self, saccades):
        average = 0
        if len(saccades) != 0:
            length = 0
            counts = 0
            for a_saccades in saccades:
                if a_saccades.saccade_direction_h > 0:
                    counts += 1
                    length += a_saccades.amplitude_h
            average = length / counts if counts != 0 else 0
        return {"average_forward_saccades_length": average}


class RegressionRatio(SaccadesFeatureExtractor):
    def extract(self, saccades):
        regression_ratio = 0
        if len(saccades) != 0:
            counts = 0
            for a_saccade in saccades:
                if a_saccade.saccade_type == 'Long Regression' or a_saccade.saccade_type == 'Short Regression':
                    counts += 1
            regression_ratio = counts / len(saccades)
        return {"regression_ratio": regression_ratio}


class ThoroughReadingRatio(SaccadesFeatureExtractor):
    def extract(self, saccades):
        ratio = 0
        if len(saccades) != 0:
            reading_amplitude_h = 0
            skimming_amplitude_h = 0
            for a_saccade in saccades:
                if a_saccade.reading_state == 'Reading':
                    reading_amplitude_h += a_saccade.amplitude_h
                if a_saccade.reading_state == 'Skimming':
                    skimming_amplitude_h += a_saccade.amplitude_h
            total_ampltitude_h = reading_amplitude_h + skimming_amplitude_h
            ratio = reading_amplitude_h / total_ampltitude_h if total_ampltitude_h != 0 else 0
        return {"thorough_reading_ratio": ratio}


class CoherentlyReadTextLength(SaccadesFeatureExtractor):
    def extract(self, saccades):
        lengths = list()
        length = 0
        is_reading_continue = False
        if len(saccades) != 0:
            for a_saccade in saccades:
                if a_saccade.reading_state == 'Reading':
                    is_reading_continue = True
                    length += a_saccade.amplitude_h
                else:
                    if is_reading_continue:
                        lengths.append(length)
                    is_reading_continue = False
                    length = 0
            length = max(lengths) if len(lengths) != 0 else 0
        return {"coherently_read_text_length": length}


def reading_model_detection(saccades):
    saccadeClassifier = SaccadeClassifier()
    for a_saccade in saccades:
        distance = mapPixelSpaceToLetterSpace(a_saccade.saccade_direction_h * a_saccade.amplitude_h)
        a_saccade.saccade_type = saccadeClassifier.classify(distance)
    saccade_sequences = SeparateSaccadesToSequences(saccades)
    for a_sequence in saccade_sequences:
        a_sequence.detect_reading_state()
        # print('Readstate for current visit slice' + str(a_sequence.reading_state))
        a_sequence.broadcast_reading_state_to_saccades()
    return saccades


class ReadingModelDataset:
    def __init__(self):
        self._data_dict = {
            "user": [],
            "document": [],
            "corpus": [],
            "paragraph": [],
            "system_relevance": [],
            "perceived_relevance": [],
            "system_relevance_type": []
        }
        self._df = None
        self._corpus = None
        self._method = "ParagraphFeature"
        self._user = None
        self._document = None

    @property
    def dataframe(self) -> pd.DataFrame:
        self.finalize()
        return self._df

    @property
    def is_finalized(self) -> bool:
        return self._df is not None

    def finalize(self):
        if not self.is_finalized:
            self._df = pd.DataFrame.from_dict(self._data_dict)
            self._data_dict = None  # free some memory space

    def add_sample(self, user, document, corpus, paragraph, system_relevance, perceived_relevance,
                   system_relevance_type, features):
        assert not self.is_finalized, "You cannot add samples to a finalized dataset."
        if self._corpus is None:
            self._corpus = corpus
        if self._corpus != corpus:
            self._corpus = "multi"

        if self._user is None:
            self._user = user
        if self._document is None:
            self._document = document

        self._data_dict["user"].append(user)
        self._data_dict["document"].append(document)
        self._data_dict["corpus"].append(corpus)
        self._data_dict["paragraph"].append(paragraph)
        self._data_dict["system_relevance"].append(system_relevance)
        self._data_dict["perceived_relevance"].append(perceived_relevance)
        self._data_dict["system_relevance_type"].append(system_relevance_type)
        # append features, one feature per column
        for k, v in features.items():
            f_key = f"f_{k}"
            if f_key not in self._data_dict:
                self._data_dict[f_key] = []
            self._data_dict[f_key].append(v[0])

    def save(self, target_dir):
        filename = "{}_{}_{}.csv".format(self._corpus, self._method, datetime.datetime.now().strftime("%Y%m%d-%H%M"))
        filepath = os.path.join(target_dir, filename)
        self.dataframe.to_csv(path_or_buf=filepath, sep=";", index=False)


def extract_training_data(study_data: dict, feature_extractor: ReadingModelBasedFeatureExtractor, target_dir=None):
    if target_dir is not None:
        assert os.path.exists(target_dir) and os.path.isdir(target_dir), \
            f"invalid path for storing training data: {target_dir}"

    dataset = ReadingModelDataset()

    for user, user_data in study_data.items():
        for document, document_data in user_data.items():
            logger.debug(f"processing {user}-{document}")
            corpus = document_data["corpus"]
            num_paragraphs = document_data["num_paragraphs"]
            gaze = document_data["dataframe"]

            visits = extract_paragraph_visits_vectorized(gaze, document, min_visit_duration=.5, max_gap_duration=.2)

            # populate training data (ignore None (-2) and headline (-1))
            for p in range(num_paragraphs):
                system_relevance = document_data["system_relevance"][p]
                perceived_relevance = document_data["perceived_relevance"][p]
                # keep the g-REL based encoding of system-relevance
                if corpus == "g-rel":
                    system_relevance_type = document_data["g-rel_relevance"]
                else:
                    system_relevance_type = "r" if system_relevance else "i"
                # filter for visits to the given paragraph with at least one sample belonging to a fixation
                p_visits = [v for v in visits if v.paragraph_id == p]
                if len(p_visits) == 0:
                    logger.debug(f"skip paragraph {document}-{p} not visited (participant {user})")
                    continue
                # extract features
                samples = feature_extractor.extract(p_visits)

                # output
                for s in samples:
                    dataset.add_sample(user=user, corpus=corpus, document=document, paragraph=p,
                                       system_relevance=system_relevance, perceived_relevance=perceived_relevance,
                                       system_relevance_type=system_relevance_type,
                                       features=s["features"])
    if target_dir is not None:
        dataset.save(target_dir=target_dir)

    return dataset


if __name__ == '__main__':
    logger.info("# ML Data Generation for SciBot")
    min_fixations = 0
    min_visit_duration = 10
    data_dir = "scibot_data_v05/output"
    target_dir = "generated/paragraph_features"

    feature_extractor = ReadingModelBasedFeatureExtractor()
    logger.info(f"loading SciBot dataset (reading task) from {data_dir}")
    dataloader = SciBotDataLoader(data_dir=data_dir, exclude_users=["A02", "A05"], gaze_data=True, reading_task=True,
                                  rating_task=False, training_data=False)

    logger.info(f"loaded data from {dataloader.num_participants} participants:")

    d_grel = extract_training_data(study_data=dataloader.grel_reading, target_dir=target_dir,
                                   feature_extractor=feature_extractor)

    d_nq = extract_training_data(study_data=dataloader.google_nq_reading, target_dir=target_dir,
                                 feature_extractor=feature_extractor)
