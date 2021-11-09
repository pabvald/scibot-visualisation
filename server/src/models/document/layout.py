from typing import List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from .base import DocumentModel, DocumentSchema
from data_loading.article_parser import Article
from models.corpus import Corpus
from models.paragraph import ParagraphLayoutModel, ParagraphLayoutSchema


class DocumentLayoutModel(DocumentModel):
    """ Document + Layout representation """

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, query: str, pars_mapping: DataFrame,
                 labels_mapping: DataFrame):
        """
        Args:
            user_id: user's id
            doc_id: document's id (filename without the .html extension)
            query: query of the document
            pars_mapping: mapping of the paragraphs
            labels_mapping: mapping of the labels
        """
        super().__init__(user_id, doc_id, corpus)
        self._query = query

        # create the paragraphs
        par_ids = pars_mapping['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_mapping = list(pars_mapping.loc[pars_mapping['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == par_id]

            self._add_paragraph(
                ParagraphLayoutModel(doc_id=doc_id, par_id=par_id, par_mapping=par_mapping,
                                     labels_mapping=labels_selection)
            )

    @property
    def query(self) -> str:
        """ Query that the user had to look an answer for """
        return self._query


class DocumentLayoutSchema(DocumentSchema):
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphLayoutSchema))
