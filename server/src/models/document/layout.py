from typing import List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from .base import DocumentModel, DocumentSchema
from models.corpus import Corpus
from models.paragraph import ParagraphLayoutModel, ParagraphLayoutSchema


class DocumentLayoutModel(DocumentModel):
    """ Document + Layout representation """

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, query: str, pars_layout: DataFrame,
                 labels_layout: DataFrame):
        """
        Args:
            user_id: user's id
            doc_id: document's id (filename without the .html extension)
            query: query of the document
            pars_layout: layout of the paragraphs
            labels_layout: layout of the labels
        """
        super().__init__(user_id, doc_id, corpus)
        self._query = query

        # create the paragraphs
        par_ids = pars_layout['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_layout = list(pars_layout.loc[pars_layout['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_layout.loc[labels_layout['paragraph_id'] == par_id]

            self._add_paragraph(
                ParagraphLayoutModel(doc_id=doc_id, par_id=par_id, par_layout=par_layout,
                                     labels_layout=labels_selection)
            )

    @property
    def query(self) -> str:
        """ Query that the user had to look an answer for """
        return self._query


class DocumentLayoutSchema(DocumentSchema):
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphLayoutSchema))
