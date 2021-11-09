from typing import Dict, List
from marshmallow import fields

from .base import DocumentModel, DocumentSchema
from models.corpus import Corpus
from models.paragraph import ParagraphFeaturesModel, ParagraphFeaturesSchema


class DocumentFeaturesModel(DocumentModel):

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, pars_features: Dict):
        """
        Args:
           user_id: user's id
           doc_id: document's id (filename without the .html extension)
           corpus: Corpus.grel or Corpus.nq
           pars_features: paragraph features
        """
        super().__init__(user_id, doc_id, corpus)
        for par_id, features in pars_features.items():
            self._add_paragraph(ParagraphFeaturesModel(par_id=par_id, features=features))


class DocumentFeaturesSchema(DocumentSchema):
    paragraphs = fields.List(fields.Nested(ParagraphFeaturesSchema))
