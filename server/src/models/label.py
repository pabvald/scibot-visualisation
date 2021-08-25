from marshmallow import Schema, fields


class Label(object):
    """
    Represents a label.
    """

    def __init__(self, par_id: int, label_id: int, line: int, text: str):
        """
        Args:
            par_id: paragraph's id
            label_id: label's id within the paragraph
            line: number of line
            text: text contained in the label
        """
        self.par_id = par_id
        self.id = label_id
        self.line = line 
        self.text = text


class LabelSchema(Schema):
    id = fields.Integer()
    par_id = fields.Integer()
    line = fields.Integer()
    text = fields.Str()
