from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from models.bounding_box import BoundingBox


class Label(BoundingBox):

    def __init__(self, label_id: int, doc_id: str, x1: float = 0, y1: float = 0, x2: float = 0, y2: float = 0,
                 text: str = ""):
        """
        Args:
            label_id: label's id
            doc_id: document's name
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
            text: text
        """
        self._id = label_id
        self._doc_id = doc_id
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2
        self._text = text
        self._fixation_durations = []

    @classmethod
    def from_layout(cls, label_id: int, doc_id: str, layout: DataFrame):
        """
        Args:
            label_id: label's id
            doc_id: document's name
            layout: bounding box's coordinates and text
        Returns:
            an instance of LabelModel
        """
        _, _, x1, y1, x2, y2, text = layout

        label = Label(label_id, doc_id, x1, y1, x2, y2, text)

        return label

    @property
    def id(self) -> int:
        """ Identifier within its paragraph """
        return self._id

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
        return sum(self._fixation_durations)  # / self.num_fixations

    def add_fix_duration(self, fix_duration: float):
        """
        Registers a fixation to the label.
        Args:
            fix_duration: fixation duirat
        """
        self._fixation_durations.append(fix_duration)


class LabelLayoutSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    text = fields.Str()


class LabelFixDurationSchema(Schema):
    id = fields.Integer()
    fixation_duration = fields.Float(data_key="fixationDuration")
