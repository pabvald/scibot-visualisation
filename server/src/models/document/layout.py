from typing import List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from .base import DocumentModel, DocumentSchema
from data_loading.article_parser import Article
from models.paragraph import ParagraphLayoutModel, ParagraphLayoutSchema


class DocumentLayoutModel(DocumentModel):
    """ Document + Layout representation """
    def __init__(self, user_id: str, doc_id: str, query: str, paragraphs: List[ParagraphLayoutModel]):
        self._query = query
        self._paragraphs = paragraphs
        super().__init__(user_id, doc_id)

    @classmethod
    def from_data(cls, user_id: str, doc_id: str, article: Article, pars_mapping: DataFrame, labels_mapping: DataFrame):
        paragraphs = []

        # combine the HTML and mapping data to create the paragraphs
        par_ids = pars_mapping['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_mapping = list(pars_mapping.loc[pars_mapping['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == par_id]

            paragraphs.append(
                ParagraphLayoutModel.from_data(doc_id=doc_id, par_mapping=par_mapping, labels_mapping=labels_selection)
            )

        return cls(user_id, doc_id, article.query.strip(), paragraphs)

    @property
    def query(self) -> str:
        """ Query that the user had to look an answer for """
        return self._query

    @property
    def paragraphs(self) -> List[ParagraphLayoutModel]:
        """ Paragraphs of the document """
        return self._paragraphs


class DocumentLayoutSchema(DocumentSchema):
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphLayoutSchema))
