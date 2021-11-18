from typing import List, Dict
from pandas.core.frame import DataFrame
from marshmallow import Schema, fields

from .corpus import Corpus
from .paragraph import (Paragraph, ParagraphLayoutSchema, ParagraphFixDurationSchema, ParagraphRelevanceSchema,
                        ParagraphFeaturesSchema)


class Document(object):
    """ Document Representation """

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, query: str = ""):
        """
        Args:
            user_id: the user's id
            doc_id: the document's id (filename without the .html extension)
            corpus: Corpus.grel or Corpus.nq
            query: query of the document
        """
        self._id = doc_id
        self._user_id = user_id
        self._corpus = corpus
        self._query = query
        self._paragraphs = []

    @staticmethod
    def from_layout(user_id: str, doc_id: str, corpus: Corpus, query: str, pars_layout: DataFrame,
                    labels_layout: DataFrame):

        document = Document(user_id=user_id, doc_id=doc_id, corpus=corpus, query=query)

        # add paragraphs
        par_ids = pars_layout['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_layout = list(pars_layout.loc[pars_layout['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_layout.loc[labels_layout['paragraph_id'] == par_id]

            paragraph = Paragraph.from_layout(par_id=par_id, doc_id=doc_id, par_layout=par_layout,
                                              labels_layout=labels_selection)
            document.add_paragraph(paragraph)

        return document

    @staticmethod
    def from_layout_gaze(user_id: str, doc_id: str, corpus: Corpus, pars_layout: DataFrame, labels_layout: DataFrame,
                         gaze_data: DataFrame):

        document = Document(user_id=user_id, doc_id=doc_id, corpus=corpus)

        # add paragraphs
        par_ids = pars_layout['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_gaze = gaze_data.loc[gaze_data['paragraph_id'] == par_id]
            par_layout = list(pars_layout.loc[pars_layout['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_layout.loc[labels_layout['paragraph_id'] == par_id]

            paragraph = Paragraph.from_layout_gaze(par_id=par_id, doc_id=doc_id, par_layout=par_layout,
                                                   labels_layout=labels_selection, gaze_data=par_gaze)
            document.add_paragraph(paragraph)

        return document

    @staticmethod
    def from_features(user_id: str, doc_id: str, corpus: Corpus, pars_features: Dict):

        document = Document(user_id=user_id, doc_id=doc_id, corpus=corpus)

        for par_id, features in pars_features.items():
            paragraph = Paragraph.from_features(par_id=par_id, doc_id=doc_id, features=features)
            document.add_paragraph(paragraph)

        return document

    @staticmethod
    def from_relevance(user_id: str, doc_id: str, corpus: Corpus, system_relevance: List[bool],
                       perceived_relevance: List[bool], predicted_relevance: Dict):

        document = Document(user_id=user_id, doc_id=doc_id, corpus=corpus)

        for par_id in range(len(system_relevance)):
            sys_rel = system_relevance[par_id]
            percv_rel = perceived_relevance[par_id]
            pred_rel = predicted_relevance.get(par_id, tuple([-1.0, False]))

            paragraph = Paragraph.from_relevance(par_id=par_id, doc_id=doc_id, system_rel=sys_rel,
                                                 perceived_rel=percv_rel, pred_rel=pred_rel)
            document.add_paragraph(paragraph)

        return document

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
    def query(self) -> str:
        """ Query that the user had to look an answer for """
        return self._query

    @property
    def paragraphs(self) -> List[Paragraph]:
        """ Paragraphs of the document """
        return self._paragraphs

    def add_paragraph(self, paragraph: Paragraph):
        """
        Adds a new paragraph to the document.
        Args:
            paragraph: new paragraph
        """
        self._paragraphs.append(paragraph)


"""
Marshmallow Schemas
"""

class DocumentBaseSchema(Schema):
    user_id = fields.Str(data_key="userId")
    id = fields.Str()
    corpus = fields.Str()


class DocumentLayoutSchema(DocumentBaseSchema):
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphLayoutSchema))


class DocumentFeaturesSchema(DocumentBaseSchema):
    paragraphs = fields.List(fields.Nested(ParagraphFeaturesSchema))


class DocumentFixDurationSchema(DocumentBaseSchema):
    paragraphs = fields.List(fields.Nested(ParagraphFixDurationSchema))


class DocumentRelevanceSchema(DocumentBaseSchema):
    paragraphs = fields.List(fields.Nested(ParagraphRelevanceSchema))
