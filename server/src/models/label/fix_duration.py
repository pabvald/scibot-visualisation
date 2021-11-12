from marshmallow import fields

from models.bounding_box import BoundingBox

from .base import LabelModel, LabelSchema


class LabelFixDurationModel(LabelModel):

    def __init__(self, label_id: int, doc_id: str, layout: any):
        super().__init__(label_id)
        _, _, x1, y1, x2, y2, _ = layout
        self._bounding_box = BoundingBox(doc_id, x1, y1, x2, y2)
        self._fixation_durations = []

    @property
    def bounding_box(self) -> BoundingBox:
        return self._bounding_box

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


class LabelFixDurationSchema(LabelSchema):
    fixation_duration = fields.Float(data_key="fixationDuration")
