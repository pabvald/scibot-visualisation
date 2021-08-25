from .label import Label, LabelSchema
from marshmallow import Schema, fields
from typing import List


class Paragraph(object):
    """
    Represents a paragraph.
    """

    def __init__(self, par_id: int, labels: List[Label]):
        """
        Args:
            par_id: paragraph's id
            labels: list of labels
        """
        self.id = par_id
        self.labels = labels 


class ParagraphSchema(Schema):
    id = fields.Integer()
    labels = fields.List(fields.Nested(LabelSchema))
