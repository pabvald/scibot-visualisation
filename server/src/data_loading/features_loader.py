import pandas as pd

from os.path import join as pjoin
from typing import Dict
from pandas.core.frame import DataFrame


class ScibotParagraphFeaturesLoader:
    _GREL_FILE_EXT = "_LongestVisitFeatureExtractor_20210826-1344_3s.csv"
    _NQ_FILE_EXT = "_LongestVisitFeatureExtractor_20210826-1345_3s.csv"
    _EXCLUDE_USER_LIST = []  # ["A02", "A05"]  # exclude A02 for g-REL only
    _INCLUDE_USER_LIST = []  # if emtpy every user besides excluded will be analysed, "A01", "B01"
    _INCLUDE_DATA_SOURCE = []  # "g_rel", "GoogleNQ"
    _STUDY_TYPE = ["main"]  # "main", "train"
    _FEATURE_SELECTION = ["f_total_time",
                          "f_fixn_n",
                          "f_fixn_dur_sum",
                          "f_fixn_dur_avg",
                          "f_fixn_dur_sd",
                          "f_scan_distance_h",
                          "f_scan_distance_v",
                          "f_scan_distance_euclid",
                          "f_scan_hv_ratio",
                          "f_avg_sacc_length",
                          "f_scan_speed_h",
                          "f_scan_speed_v",
                          "f_scan_speed",
                          "f_box_area",
                          "f_box_area_per_time",
                          "f_fixns_per_box_area",
                          "f_hull_area_per_time",
                          "f_fixns_per_hull_area"]

    grel_par_features = {}
    google_nq_par_features = {}

    def __init__(self, data_dir: str, googleNQ: bool = True, gREL: bool = True,
                 include_users=None, exclude_users=None):
        """

        Args:
            data_dir: directory containing the mapping files.
            googleNQ: determines if the mappings of the GoogleNQ files are included.
            gREL: determines if the mappings of the g-REL articles are included.
        """
        super().__init__()

        self.data_dir = data_dir
        if googleNQ:
            self._INCLUDE_DATA_SOURCE.append("GoogleNQ")
        if gREL:
            self._INCLUDE_DATA_SOURCE.append("g-REL")
        if include_users is not None:
            assert isinstance(include_users, list)
            self._INCLUDE_USER_LIST = include_users
        if exclude_users is not None:
            assert isinstance(exclude_users, list)
            self._EXCLUDE_USER_LIST = exclude_users

        self._load_data()

    def _load_data(self):
        """ Loads the specified data"""
        if "g-REL" in self._INCLUDE_DATA_SOURCE:
            self._load_grel()
        if "GoogleNQ" in self._INCLUDE_DATA_SOURCE:
            self._load_google_nq()

    def _load_grel(self):
        """ Loads the features of the g-REL files """
        paths = [pjoin(self.data_dir, "g-REL", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            data = self._load_mapping(pjoin(path, 'g-rel' + self._GREL_FILE_EXT))
            self.grel_par_features = self._extract_features(data)

    def _load_google_nq(self):
        """ Loads the features of the GoggleNQ files """
        paths = [pjoin(self.data_dir, "GoogleNQ", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            data = self._load_mapping(pjoin(path, 'nq' + self._NQ_FILE_EXT))
            self.google_nq_par_features = self._extract_features(data)

    def _extract_features(self, data: DataFrame) -> Dict[str, Dict[str, Dict[int, Dict[str, float]]]]:
        """
        Extracts the features of every paragrpah

        Args:
            data: dataframe containing the features of a document.
        """
        data_dict = {}
        # every user
        for user_id in data.user.unique():
            data_dict[user_id] = {}
            # every document
            for doc_id in data.loc[data['user'] == user_id].document.unique():
                data_dict[user_id][doc_id] = {}
                # every paragraph
                for par_id in data.loc[(data['user'] == user_id) & (data['document'] == doc_id)].paragraph.unique():
                    data_dict[user_id][doc_id][par_id] = {}
                    features = data.loc[(data['user'] == user_id) &
                                        (data['document'] == doc_id) &
                                        (data['paragraph'] == par_id),
                                        self._FEATURE_SELECTION]
                    if features is not None and not features.empty:
                        data_dict[user_id][doc_id][par_id] = features.to_dict('records')[0]
        return data_dict

    def _is_valid_user(self, user: str) -> bool:
        """
        Determine if a certain user has to be included

        Args:
            user: user's id
        """
        return user not in self._EXCLUDE_USER_LIST and (
                not self._INCLUDE_USER_LIST or user in self._INCLUDE_USER_LIST)

    @staticmethod
    def _load_mapping(path: str) -> pd.DataFrame:
        """ Reads a file containing a mapping into a Pandas dataframe """
        return pd.read_csv(path, delimiter=";", encoding='utf-8', float_precision='round_trip', na_values="None")
