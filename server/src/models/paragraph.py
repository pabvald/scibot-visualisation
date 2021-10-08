from typing import List, Dict, Tuple
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from flask import current_app as app
from .bounding_box import BoundingBox
from .label import LabelModel, LabelSchema
from features import FixationEvent, SaccadeEvent


class ParagraphModel(BoundingBox):
    """
    Representation of  a paragraph.
    """

    def __init__(self, article_id: str, par_id: int, x1: float, y1: float, x2: float, y2: float,
                 system_relevance: bool, perceived_relevance: bool, pred_relevance: Tuple[float, bool],
                 gaze_data: DataFrame, labels: List[LabelModel], features: Dict):
        """
        Args:
            par_id: paragraph's id
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
            labels: list of labels
            gaze_data: gaze points within the paragraph.
            system_relevance: whether the paragraph is relevance for the query
            perceived_relevance: whether the user perceived the paragraph as relevant
            features: precomputed features
        """
        super().__init__(article_id, par_id, x1, y1, x2, y2)
        self._system_relevance = system_relevance
        self._perceived_relevance = perceived_relevance
        self._pred_relevance = pred_relevance
        self._labels = labels
        self._gaze_data = gaze_data
        self._features = features

    @classmethod
    def from_data(cls, article_id: str, system_relevance: bool, perceived_relevance: bool,
                  pred_relevance: Tuple[bool, float], gaze_data: DataFrame, par_mapping: DataFrame,
                  labels_mapping: DataFrame, features: Dict):
        """
        Create a paragraph from
        Args:
            article_id: id of the article
            system_relevance: whether the paragraph is relevant or not
            perceived_relevance: whether the user has labeled the paragraph as relevant or not
            pred_relevance: predicted relevance based on features
            gaze_data: gaze points within the paragraph
            par_mapping: mapping of the paragraph coordinates
            labels_mapping: mapping of the label coordinates
            features: precomputed paragraph features
        """
        par_labels = []
        par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping

        # create paragraph's labels
        for j, label_mapping in labels_mapping.iterrows():
            par_labels.append(
                LabelModel.from_data(article_id=article_id, mapping=label_mapping)
            )
        return cls(article_id, par_id, par_x1, par_y1, par_x2, par_y2, system_relevance,
                   perceived_relevance, pred_relevance, gaze_data, par_labels, features)

    @property
    def system_relevance(self) -> bool:
        """ The paragraph is labeled as 'relevant' """
        return self._system_relevance

    @property
    def perceived_relevance(self) -> bool:
        """ The paragraph is perceived as 'relevant' by the user """
        return self._perceived_relevance

    @property
    def pred_relevance(self) -> Tuple[float, bool]:
        """ Predicted relevance based on the paragraph's features """
        return self._pred_relevance

    @property
    def labels(self) -> List[LabelModel]:
        """ Labels contained in the paragraph """
        return self._labels

    @property
    def gaze_data(self) -> DataFrame:
        """ Gaze data """
        return self._gaze_data

    @property
    def fixations(self) -> List[FixationEvent]:
        """ Get the fixation events within this paragraph """
        return FixationEvent.from_dataframe(self.gaze_data)

    @property
    def saccades(self) -> List[SaccadeEvent]:
        """ Get the saccade events within this paragraph """
        return SaccadeEvent.from_fixations(self.fixations)

    @property
    def features(self) -> Dict:
        """ Precomputed features """
        return self._features


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    system_relevance = fields.Boolean(data_key="systemRelevance")
    perceived_relevance = fields.Boolean(data_key="perceivedRelevance")
    pred_relevance = fields.Tuple((fields.Float(), fields.Boolean()), data_key="predictedRelevance")
    labels = fields.List(fields.Nested(LabelSchema))
    features = fields.Dict()
