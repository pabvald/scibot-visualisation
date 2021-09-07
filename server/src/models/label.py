from marshmallow import Schema, fields


class LabelModel(object):
    """
    Representation of a label.
    """

    def __init__(self, par_id: int, label_id: int, x1: float, y1: float,
                 x2: float, y2: float, text: str):
        """
        Args:
            par_id: paragraph's id
            label_id: label's id within the paragraph
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
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
    def from_mapping(cls, mapping: any):
        """ Creates an instance of Label given a mapping
        
        Args:
            mapping: mapping of the coordinates of the label
        """
        paragraph_id, label_id, x1, y1, x2, y2, text = mapping
        return cls(paragraph_id, label_id, x1, y1, x2, y2, text)


class LabelSchema(Schema):
    id = fields.Integer()
    par_id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    text = fields.Str()
