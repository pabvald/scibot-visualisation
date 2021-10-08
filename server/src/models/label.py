from flask import current_app as app
from features import FixationEvent
from .bounding_box import BoundingBox
from marshmallow import Schema, fields


class LabelModel(BoundingBox):
    """
    Representation of a label.
    """

    def __init__(self, article_id: str, par_id: int, label_id: int, x1: float, y1: float, x2: float, y2: float,
                 text: str):
        """
        Args:
            article_id: article's id
            par_id: paragraph's id
            label_id: label's id within the paragraph
            x1: first x normalized coordinate
            y1: first y normalized coordinate
            x2: second x normalized coordinate
            y2: second y normalized coordinate
            text: text contained in the label
        """
        super().__init__(article_id, label_id, x1, y1, x2, y2)
        self._par_id = par_id
        self._text = text
        self._fixation_durations = []

    @classmethod
    def from_data(cls, article_id: str, mapping: any):
        """
        Creates an instance of Label given a mapping.
        Args:
            article_id: article's id
            mapping: mapping of the coordinates of the label
        """
        paragraph_id, label_id, x1, y1, x2, y2, text = mapping
        return cls(article_id, paragraph_id, label_id, x1, y1, x2, y2, text)

    @property
    def par_id(self) -> int:
        """ Paragraph id. """
        return self._par_id

    @property
    def text(self) -> str:
        """ Text contained in the label """
        return self._text.strip()

    @property
    def num_fixations(self) -> int:
        """ Number of fixations on the label """
        return len(self._fixation_durations)

    @property
    def fixation_duration(self) -> float:
        """ Total fixation duration on the label """
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
