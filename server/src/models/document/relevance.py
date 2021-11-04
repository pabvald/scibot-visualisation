from typing import Dict, List
from marshmallow import fields

from .base import DocumentModel, DocumentSchema
from models.paragraph import ParagraphRelevanceModel, ParagraphRelevanceSchema


class DocumentRelevanceModel(DocumentModel):

    def __init__(self, user_id: str, doc_id: str, query: str, system_relevance: List[bool],
                 perceived_relevance: List[bool], predicted_relevance: Dict):
        """
        Args:
           user_id: user's id
           doc_id: document's id (filename without the .html extension)
           query: query of the document
           system_relevance: system relevance
           perceived_relevance: user's relevance assessment
           predicted_relevance: model's relevance prediction
        """
        super().__init__(user_id, doc_id, query)
        self._paragraphs = []
        for par_id in range(len(system_relevance)):
            sys_rel = system_relevance[par_id]
            percv_rel = perceived_relevance[par_id]
            pred_rel = predicted_relevance.get(par_id, tuple([-1.0, False]))

            self._paragraphs.append(
                ParagraphRelevanceModel(par_id=par_id, system_rel=sys_rel, perceived_rel=percv_rel,
                                        pred_rel=pred_rel)
            )

    @property
    def paragraphs(self) -> List[ParagraphRelevanceModel]:
        """ Paragraphs of the document """
        return self._paragraphs


class DocumentRelevanceSchema(DocumentSchema):
    paragraphs = fields.List(fields.Nested(ParagraphRelevanceSchema))
