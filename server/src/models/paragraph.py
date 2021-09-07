from pandas.core.frame import DataFrame
from .label import LabelModel, LabelSchema
from marshmallow import Schema, fields
from typing import List, Dict


class ParagraphModel(object):
    """
    Representation of  a paragraph.
    """

    def __init__(self, par_id: int, x1: float, y1: float, x2: float, y2: float,
                 answer: bool, labels: List[LabelModel], gaze_data: DataFrame):
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
        self.id = par_id
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        self.answer = answer
        self.labels = labels
        self.gaze_data = gaze_data

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


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    answer = fields.Boolean()
    labels = fields.List(fields.Nested(LabelSchema))
