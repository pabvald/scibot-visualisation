from marshmallow import Schema, fields
from models.layout import LayoutModel, LayoutSchema
from .base import LabelModel, LabelSchema


class LabelLayoutModel(LabelModel):

    def __init__(self, label_id: int, doc_id: str, mapping: any):
        super().__init__(label_id)
        _, label_id, x1, y1, x2, y2, text = mapping
        self._layout = LayoutModel(doc_id, x1, y1, x2, y2)
        self._text = text

    @property
    def text(self) -> str:
        """ Text contained in the label """
        return self._text.strip()

    @property
    def layout(self) -> LayoutModel:
        return self._layout


class LabelLayoutSchema(LabelSchema):
    text = fields.Str()
    layout = fields.Nested(LayoutSchema)
