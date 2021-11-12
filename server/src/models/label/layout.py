from marshmallow import fields
from models.bounding_box import BoundingBox, BoundingBoxSchema
from .base import LabelModel, LabelSchema


class LabelLayoutModel(LabelModel):

    def __init__(self, label_id: int, doc_id: str, layout: any):
        super().__init__(label_id)
        _, label_id, x1, y1, x2, y2, text = layout
        self._bounding_box = BoundingBox(doc_id, x1, y1, x2, y2)
        self._text = text

    @property
    def text(self) -> str:
        """ Text contained in the label """
        return self._text.strip()

    @property
    def bounding_box(self) -> BoundingBox:
        return self._bounding_box


class LabelLayoutSchema(LabelSchema):
    text = fields.Str()
    bounding_box = fields.Nested(BoundingBoxSchema, data_key="boundingBox")
