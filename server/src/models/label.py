from marshmallow import Schema, fields


class Label(object):
    """
    Representation of a label.
    """

    def __init__(self, par_id: int, label_id: int, x1: float, y1: float,
                 x2: float, y2: float, text: str):
        """
        Args:
            par_id: paragraph's id
            label_id: label's id within the paragraph

            text: text contained in the label
        """
        self.par_id = par_id
        self.id = label_id
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        self.text = text

    @classmethod
    def from_mapping(cls, label_mapping: any):
        paragraph_id, label_id, x1, y1, x2, y2, text = label_mapping
        return cls(paragraph_id, label_id, x1, y1, x2, y2, text)


class LabelSchema(Schema):
    id = fields.Integer()
    par_id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    text = fields.Str()
