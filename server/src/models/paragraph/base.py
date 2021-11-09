from typing import List
from marshmallow import Schema, fields

from models.label.base import LabelModel


class ParagraphModel(object):
    """ Paragraph representation """

    def __init__(self, par_id: int):
        """
        Args:
            par_id: paragraph's id
        """
        self._id = par_id
        self._labels =[]

    @property
    def id(self):
        """ The id of the paragraph """
        return self._id

    @property
    def labels(self) -> List[LabelModel]:
        """ Labels contained in the paragraph """
        return self._labels

    def _add_label(self, label: LabelModel):
        """ Add a new label.
        Args:
            label: new label
        """
        self._labels.append(label)


class ParagraphSchema(Schema):
    id = fields.Integer()
