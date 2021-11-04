from typing import Tuple
from marshmallow import fields

from .base import ParagraphModel, ParagraphSchema


class ParagraphRelevanceModel(ParagraphModel):

    def __init__(self, par_id: int, system_rel: float, perceived_rel: float,
                 pred_rel: Tuple[float, bool]):
        super().__init__(par_id)
        self._system_relevance = system_rel
        self._perceived_relevance = perceived_rel
        self._pred_relevance = pred_rel

    @property
    def system_relevance(self) -> bool:
        """ The paragraph is labeled as 'relevant' """
        return self._system_relevance

    @property
    def perceived_relevance(self) -> bool:
        """ The paragraph is perceived as 'relevant' by the user """
        return self._perceived_relevance

    @property
    def pred_relevance(self) -> Tuple[float, bool]:
        """ Predicted relevance based on the paragraph's features """
        return self._pred_relevance


class ParagraphRelevanceSchema(ParagraphSchema):
    system_relevance = fields.Boolean(data_key="systemRelevance")
    perceived_relevance = fields.Boolean(data_key="perceivedRelevance")
    pred_relevance = fields.Tuple((fields.Float(), fields.Boolean()), data_key="predictedRelevance")
