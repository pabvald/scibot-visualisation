from typing import List
from marshmallow import fields
from pandas.core.frame import DataFrame

from features import FixationEvent, SaccadeEvent
from models.layout import LayoutModel, LayoutSchema
from models.label import LabelFixDurationModel, LabelFixDurationSchema

from .base import ParagraphModel, ParagraphSchema


class ParagraphFixDurationModel(ParagraphModel):
    """ Paragraph + Layout representation """

    def __init__(self, par_id: int, doc_id: str, par_mapping: DataFrame, labels_mapping: DataFrame,
                 gaze_data: DataFrame):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            par_mapping: mapping of the paragraph
            labels_mapping: mapping of the paragraph's labels
        """
        super().__init__(par_id)
        _, x1, y1, x2, y2 = par_mapping
        self._layout = LayoutModel(doc_id, x1, y1, x2, y2)
        self._gaze_data = gaze_data

        # create  labels
        for label_id, label_mapping in labels_mapping.iterrows():
            self._add_label(
                LabelFixDurationModel(label_id=label_id, doc_id=doc_id, mapping=label_mapping)
            )

    @property
    def layout(self) -> LayoutModel:
        """ Layout of paragraph """
        return self._layout

    @property
    def gaze_data(self) -> DataFrame:
        """ Gaze data """
        return self._gaze_data

    @property
    def fixations(self) -> List[FixationEvent]:
        """ Get the fixation events within this paragraph """
        return FixationEvent.from_dataframe(self.gaze_data)

    @property
    def saccades(self) -> List[SaccadeEvent]:
        """ Get the saccade events within this paragraph """
        return SaccadeEvent.from_fixations(self.fixations)


class ParagraphFixDurationSchema(ParagraphSchema):
    #layout = fields.Nested(LayoutSchema)
    labels = fields.List(fields.Nested(LabelFixDurationSchema))
