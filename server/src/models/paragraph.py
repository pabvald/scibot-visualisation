from typing import List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from flask import current_app as app
from .label import LabelModel, LabelSchema
from features import FixationEvent, SaccadeEvent


class ParagraphModel(object):
    """
    Representation of  a paragraph.
    """

    def __init__(self, par_id: int, x1: float, y1: float, x2: float, y2: float, answer: bool,
                 labels: List[LabelModel], gaze_data: DataFrame, avg_fix_duration: float,
                 avg_forward_saccade_length: float, reg_ratio: float, thorough_read_ratio: float,
                 coherent_read_length: float):
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
            avg_fix_duration: average fixation duration
            avg_forward_saccade_length: average forward saccade_length
            reg_ratio: regression ratio
            thorough_read_ratio: thorough reading ration
            coherent_read_length: coherent read text length
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
        self._avg_fix_duration = avg_fix_duration
        self._avg_forward_saccade_length = avg_forward_saccade_length
        self._reg_ratio = reg_ratio
        self._thorough_read_ratio = thorough_read_ratio
        self._coherent_read_length = coherent_read_length

    @classmethod
    def from_data(cls, parsing: Dict, gaze_data: DataFrame, par_mapping: DataFrame,
                  labels_mapping: DataFrame, features: List):
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
        par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping
        avg_fix_duration, avg_forward_saccade_length, reg_ratio, \
            thorough_read_ratio, coherent_read_length = [-1, -1, -1, -1, -1]

        # extract features if provided
        if features:
            _, avg_fix_duration, avg_forward_saccade_length, reg_ratio, \
                thorough_read_ratio, coherent_read_length = features

        # Generate paragraph's labels
        for j, label_mapping in labels_mapping.iterrows():
            par_labels.append(
                LabelModel.from_mapping(label_mapping)
            )
        return cls(par_id, par_x1, par_y1, par_x2, par_y2, parsing['answer'], par_labels, gaze_data,
                   avg_fix_duration, avg_forward_saccade_length, reg_ratio,
                   thorough_read_ratio, coherent_read_length)

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
    def avg_fix_duration(self) -> float:
        return self._avg_fix_duration

    @property
    def avg_forward_saccade_length(self) -> float:
        return self._avg_forward_saccade_length

    @property
    def reg_ratio(self) -> float:
        return self._reg_ratio

    @property
    def thorough_read_ratio(self) -> float:
        return self._thorough_read_ratio

    @property
    def coherent_read_length(self) -> float:
        return self._coherent_read_length

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


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    answer = fields.Boolean()
    labels = fields.List(fields.Nested(LabelSchema))
    avg_fix_duration = fields.Float(data_key="avgFixDuration")
    avg_forward_saccade_length = fields.Float(data_key="avgForwardSaccadeLength")
    reg_ratio = fields.Float(data_key="regRatio")
    thorough_read_ratio = fields.Float(data_key="thoroughReadRatio")
    coherent_read_length = fields.Float(data_key="coherentReadLength")
