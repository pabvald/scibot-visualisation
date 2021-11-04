from marshmallow import fields

from models.layout import LayoutModel, LayoutSchema

from .base import LabelModel, LabelSchema


class LabelFixDurationModel(LabelModel):

    def __init__(self, label_id: int, doc_id: str, mapping: any):
        super().__init__(label_id)
        _, _, x1, y1, x2, y2, _ = mapping
        self._layout = LayoutModel(doc_id, x1, y1, x2, y2)
        self._fixation_durations = []

    @property
    def layout(self) -> LayoutModel:
        return self._layout

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
