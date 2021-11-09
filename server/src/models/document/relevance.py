from typing import Dict, List
from marshmallow import fields

from .base import DocumentModel, DocumentSchema
from models.corpus import Corpus
from models.paragraph import ParagraphRelevanceModel, ParagraphRelevanceSchema


class DocumentRelevanceModel(DocumentModel):

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, system_relevance: List[bool],
                 perceived_relevance: List[bool], predicted_relevance: Dict):
        """
        Args:
           user_id: user's id
           doc_id: document's id (filename without the .html extension)
           corpus: Corpus.grel or Corpus.nq
           system_relevance: system relevance
           perceived_relevance: user's relevance assessment
           predicted_relevance: model's relevance prediction
        """
        super().__init__(user_id, doc_id, corpus)
        for par_id in range(len(system_relevance)):
            sys_rel = system_relevance[par_id]
            percv_rel = perceived_relevance[par_id]
            pred_rel = predicted_relevance.get(par_id, tuple([-1.0, False]))

            self._add_paragraph(
                ParagraphRelevanceModel(par_id=par_id, system_rel=sys_rel, perceived_rel=percv_rel,
                                        pred_rel=pred_rel)
            )


class DocumentRelevanceSchema(DocumentSchema):
    paragraphs = fields.List(fields.Nested(ParagraphRelevanceSchema))
