from flask import current_app as app
from features import FixationEvent
from .bounding_box import BoundingBox
from marshmallow import Schema, fields


class LabelModel(BoundingBox):
    """
    Representation of a label.
    """

    def __init__(self, par_id: int, label_id: int, x1: float, y1: float, x2: float, y2: float, text: str):
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
        self._par_id = par_id
        self._id = label_id
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2
        self._text = text
        self._fixation_durations = []
        self._normalized_coord = True

    @classmethod
    def from_mapping(cls, mapping: any):
        """
        Creates an instance of Label given a mapping.
        Args:
            mapping: mapping of the coordinates of the label
        """
        paragraph_id, label_id, x1, y1, x2, y2, text = mapping
        return cls(paragraph_id, label_id, x1, y1, x2, y2, text)

    @property
    def normalized_coord(self) -> bool:
        return self._normalized_coord

    @normalized_coord.setter
    def normalized_coord(self, nc: bool):
        self._normalized_coord = nc

    @property
    def par_id(self) -> int:
        return self._par_id

    @property
    def id(self) -> int:
        return self._id

    @property
    def x1(self) -> float:
        result = self._x1
        if not self._normalized_coord:
            result *= app.config['SCREEN_WIDTH']
        return result

    @property
    def y1(self) -> float:
        result = self._y1
        if not self._normalized_coord:
            result *= app.config['SCREEN_HEIGHT']
        return result

    @property
    def x2(self) -> float:
        result = self._x2
        if not self._normalized_coord:
            result *= app.config['SCREEN_WIDTH']
        return result

    @property
    def y2(self) -> float:
        result = self._y2
        if not self._normalized_coord:
            result *= app.config['SCREEN_HEIGHT']
        return result

    @property
    def coordinates(self):
        return self.x1, self.y1, self.x2, self.y2

    @property
    def text(self) -> str:
        return self._text.strip()

    @property
    def num_fixations(self) -> int:
        return len(self._fixation_durations)

    @property
    def fixation_duration(self) -> float:
        return sum(self._fixation_durations) #/ self.num_fixations

    def add_fixation(self, fixation: FixationEvent):
        """
        Registers a fixation to the label.
        Args:
            fixation: a fixation event
        """
        self._fixation_durations.append(fixation.duration)


class LabelSchema(Schema):
    id = fields.Integer()
    par_id = fields.Integer(data_key="parId")
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    text = fields.Str()
    fixation_duration = fields.Float(data_key="fixationDuration")
