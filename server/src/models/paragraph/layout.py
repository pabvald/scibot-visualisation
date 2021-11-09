from typing import List
from marshmallow import fields
from pandas.core.frame import DataFrame

from models.layout import LayoutModel, LayoutSchema
from models.label import LabelLayoutModel, LabelLayoutSchema

from .base import ParagraphModel, ParagraphSchema


class ParagraphLayoutModel(ParagraphModel):
    """ Paragraph + Layout representation """

    def __init__(self, par_id: int, doc_id: str, par_mapping: DataFrame, labels_mapping: DataFrame):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            par_mapping: mapping of the paragraph
            labels_mapping: mapping of the paragraph's labels
        """
        super().__init__(par_id)
        _, x1, y1, x2, y2 = par_mapping
        self._layout = LayoutModel(doc_id, x1, y1, x2, y2)

        # create  labels
        for label_id, label_mapping in labels_mapping.iterrows():
            self._add_label(
                LabelLayoutModel(label_id=label_id, doc_id=doc_id, mapping=label_mapping)
            )

    @property
    def layout(self) -> LayoutModel:
        """ Layout of paragraph """
        return self._layout


class ParagraphLayoutSchema(ParagraphSchema):
    layout = fields.Nested(LayoutSchema)
    labels = fields.List(fields.Nested(LabelLayoutSchema))
