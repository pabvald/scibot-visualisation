from typing import List, Dict
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

    def __init__(self, par_id: int, x1: float, y1: float, x2: float, y2: float, answer: bool,
                 labels: List[LabelModel], gaze_data: DataFrame, features: Dict):
        """
        Args:
            par_id: paragraph's id
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
            answer: the paragraph contains the answer or not
            labels: list of labels
            gaze_data: gaze points within the paragraph.
            features: precomputed features
        """
        self._id = par_id
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2
        self._answer = answer
        self._labels = labels
        self._gaze_data = gaze_data
        self._normalized_coord = True
        self._features = features

    @classmethod
    def from_data(cls, parsing: Dict, gaze_data: DataFrame, par_mapping: DataFrame,
                  labels_mapping: DataFrame, features: DataFrame=None):
        """
        Create a paragraph from
        Args:
            parsing: data from the HTML parsing
            gaze_data: gaze points within the paragraph
            par_mapping: mapping of the paragraph coordinates
            labels_mapping: mapping of the label coordinates
            features: precomputed paragraph features
        """
        par_labels = []
        features_dict = {}
        par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping

        if features is not None and not features.empty:
            features_dict = features.to_dict('records')[0]
            features_dict.pop('paragraph', None)

        # Generate paragraph's labels
        for j, label_mapping in labels_mapping.iterrows():
            par_labels.append(
                LabelModel.from_mapping(label_mapping)
            )
        return cls(par_id, par_x1, par_y1, par_x2, par_y2, parsing['answer'], par_labels, gaze_data,
                   features_dict)

    @property
    def normalized_coord(self) -> bool:
        return self._normalized_coord

    @normalized_coord.setter
    def normalized_coord(self, nc: bool):
        self._normalized_coord = nc

    @property
    def id(self) -> int:
        return self._id

    @property
    def x1(self) -> float:
        result = self._x1
        if not self._normalized_coord:
            result *= app.config['SCREEN_WIDTH']
        return result

    @property
    def y1(self) -> float:
        result = self._y1
        if not self._normalized_coord:
            result *= app.config['SCREEN_HEIGHT']
        return result

    @property
    def x2(self) -> float:
        result = self._x2
        if not self._normalized_coord:
            result *= app.config['SCREEN_WIDTH']
        return result

    @property
    def y2(self) -> float:
        result = self._y2
        if not self._normalized_coord:
            result *= app.config['SCREEN_HEIGHT']
        return result

    @property
    def coordinates(self):
        return self.x1, self.y1, self.x2, self.y2

    @property
    def answer(self) -> bool:
        return self._answer

    @property
    def labels(self) -> List[LabelModel]:
        return self._labels

    @property
    def gaze_data(self) -> DataFrame:
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
        return self._features


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    answer = fields.Boolean()
    labels = fields.List(fields.Nested(LabelSchema))
    features = fields.Dict()
