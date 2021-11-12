from typing import List
from marshmallow import fields
from pandas.core.frame import DataFrame

from models.bounding_box import BoundingBox, BoundingBoxSchema
from models.label import LabelLayoutModel, LabelLayoutSchema

from .base import ParagraphModel, ParagraphSchema


class ParagraphLayoutModel(ParagraphModel):
    """ Paragraph + Layout representation """

    def __init__(self, par_id: int, doc_id: str, par_layout: DataFrame, labels_layout: DataFrame):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            par_layout: layout of the paragraph
            labels_layout: layout of the paragraph's labels
        """
        super().__init__(par_id)
        _, x1, y1, x2, y2 = par_layout
        self._bounding_box = BoundingBox(doc_id, x1, y1, x2, y2)

        # create  labels
        for label_id, label_layout in labels_layout.iterrows():
            self._add_label(
                LabelLayoutModel(label_id=label_id, doc_id=doc_id, layout=label_layout)
            )

    @property
    def bounding_box(self) -> BoundingBox:
        """ Layout of paragraph """
        return self._bounding_box


class ParagraphLayoutSchema(ParagraphSchema):
    bounding_box = fields.Nested(BoundingBoxSchema, data_key="boundingBox")
    labels = fields.List(fields.Nested(LabelLayoutSchema))
