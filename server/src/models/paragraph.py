from pandas.core.frame import DataFrame
from .label import LabelModel, LabelSchema
from marshmallow import Schema, fields
from typing import List, Dict
from config import STUDY_WIDTH, STUDY_HEIGHT
from features import FixationEvent, SaccadeEvent


class ParagraphModel(object):
    """
    Representation of  a paragraph.
    """

    def __init__(self, par_id: int, x1: float, y1: float, x2: float, y2: float, answer: bool,
                 labels: List[LabelModel], gaze_data: DataFrame):
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

    @classmethod
    def from_data(cls, parsing: Dict, gaze_data: DataFrame, par_mapping: DataFrame, labels_mapping: DataFrame):
        """
        Create a paragraph from
        Args:
            parsing: data from the HTML parsing
            gaze_data: gaze points within the paragraph
            par_mapping: mapping of the paragraph coordinates
            labels_mapping: mapping of the label coordinates
        """
        par_labels = []
        par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping

        # Generate paragraph's labels
        for j, label_mapping in labels_mapping.iterrows():
            par_labels.append(
                LabelModel.from_mapping(label_mapping)
            )
        return cls(par_id, par_x1, par_y1, par_x2, par_y2, parsing['answer'], par_labels, gaze_data)

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
            result *= STUDY_WIDTH
        return result

    @property
    def y1(self) -> float:
        result = self._y1
        if not self._normalized_coord:
            result *= STUDY_HEIGHT
        return result

    @property
    def x2(self) -> float:
        result = self._x2
        if not self._normalized_coord:
            result *= STUDY_WIDTH
        return result

    @property
    def y2(self) -> float:
        result = self._y2
        if not self._normalized_coord:
            result *= STUDY_HEIGHT
        return result

    @property
    def coordinates(self):
        return self.x1, self.y1, self.x2, self.y2

    @property
    def answer(self) -> str:
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


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    answer = fields.Boolean()
    labels = fields.List(fields.Nested(LabelSchema))
