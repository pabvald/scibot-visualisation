from marshmallow import Schema, fields


class LabelModel:

    def __init__(self, label_id: int):
        """
        Args:
            label_id: label's id within the paragraph
        """
        self._id = label_id

    @property
    def id(self) -> int:
        return self._id


class LabelSchema(Schema):
    id = fields.Integer()
