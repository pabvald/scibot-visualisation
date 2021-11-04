from typing import Dict, List
from marshmallow import fields

from .base import DocumentModel, DocumentSchema
from models.paragraph import ParagraphFeaturesModel, ParagraphFeaturesSchema


class DocumentFeaturesModel(DocumentModel):

    def __init__(self, user_id: str, doc_id: str, query: str, pars_features: Dict):
        """
        Args:
           user_id: user's id
           doc_id: document's id (filename without the .html extension)
           query: query of the document
           pars_features: paragraph features
        """
        super().__init__(user_id, doc_id, query)
        self._paragraphs = []
        for par_id, features in pars_features.items():
            self._paragraphs.append(ParagraphFeaturesModel(par_id=par_id, features=features))

    @property
    def paragraphs(self) -> List[ParagraphFeaturesModel]:
        """ Paragraphs of the document """
        return self._paragraphs


class DocumentFeaturesSchema(DocumentSchema):
    paragraphs = fields.List(fields.Nested(ParagraphFeaturesSchema))
