from typing import List
from marshmallow import Schema, fields

from models.corpus import Corpus
from models.paragraph.base import ParagraphModel


class DocumentModel(object):
    """ Document Representation """

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus):
        """
        Args:
            user_id: the user's id
            doc_id: the document's id (filename without the .html extension)
            corpus: Corpus.grel or Corpus.nq
        """
        self._id = doc_id
        self._user_id = user_id
        self._corpus = corpus
        self._paragraphs = []

    @property
    def id(self) -> str:
        """ Document id or filename """
        return self._id

    @property
    def user_id(self) -> str:
        """ User id"""
        return self._user_id

    @property
    def corpus(self) -> str:
        """ Corpus """
        return self._corpus.value

    @property
    def paragraphs(self) -> List[ParagraphModel]:
        """ Paragraphs of the document """
        return self._paragraphs

    def _add_paragraph(self, paragraph: ParagraphModel):
        """
        Adds a new paragraph to the document.
        Args:
            paragraph: new paragraph
        """
        self._paragraphs.append(paragraph)


class DocumentSchema(Schema):
    user_id = fields.Str(data_key="userId")
    id = fields.Str()
    corpus = fields.Str()

