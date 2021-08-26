from .label import Label, LabelSchema
from marshmallow import Schema, fields
from typing import List


class Paragraph(object):
    """
    Representation of  a paragraph.
    """

    def __init__(self, par_id: int, x1: float, y1: float, x2: float, y2: float,
                 labels: List[Label]):
        """
        Args:
            par_id: paragraph's id
            labels: list of labels
        """
        self.id = par_id
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        self.answer = False
        self.labels = labels

    @classmethod
    def from_mapping(cls, par_mapping, labels_mapping):
        par_labels = []
        par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping

        # Generate paragraph's labels
        for j, label_mapping in labels_mapping.iterrows():
            par_labels.append(
                Label.from_mapping(label_mapping)
            )
        return cls(par_id, par_x1, par_y1, par_x2, par_y2, par_labels)


class ParagraphSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    answer = fields.Boolean()
    labels = fields.List(fields.Nested(LabelSchema))
