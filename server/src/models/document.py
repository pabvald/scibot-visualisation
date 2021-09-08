import os

from enum import Enum
from typing import Any, List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from data_loading.article_parser import Article
from features import FixationEvent, SaccadeEvent
from models.paragraph import ParagraphModel, ParagraphSchema


class Corpus(Enum):
    grel = "g-REL"
    nq = "GoogleNQ"


class DocumentModel(object):
    """Document Representation"""

    def __init__(self, user_id: str, article_id: str, corpus: Corpus, query: str, paragraphs: List[ParagraphModel]):
        """
        Args:
            user_id: the user's id
            article_id: the article's id (filename without the .html extension)
            corpus: 'g-REL' or 'GoogleNQ'
            query: query of the corresponding document.
            paragraphs: list of paragraphs
        """
        self._user_id = user_id
        self._id = article_id
        self._corpus = corpus
        self._query = query
        self._paragraphs = paragraphs

    @classmethod 
    def from_data(cls, user_id: str, article: Article, gaze_data: DataFrame, pars_mapping: DataFrame,
                  labels_mapping: DataFrame):
        paragraphs = []
        _, article_id = os.path.split(article.article_id)

        # determine corpus
        corpus = Corpus.grel if article_id.startswith('g-rel') else Corpus.nq

        # combine the HTML, gaze and mapping data to create the paragraphs
        par_ids = pars_mapping['paragraph_id'].to_numpy()
        for par_id in par_ids: 
            if par_id >= 0: 
                if corpus == Corpus.grel:
                    par_parsing = {'answer': any([par['answer'] for par in article.paragraphs])}
                else:
                    par_parsing = {'answer': article.paragraphs[par_id]['answer']}

            else:
                par_parsing = {'answer': False}

            par_gaze = gaze_data.loc[gaze_data['paragraph_id'] == par_id]
            par_mapping = pars_mapping.loc[pars_mapping['paragraph_id'] == par_id].to_numpy()[0]
            labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == par_id]
            paragraphs.append(
                ParagraphModel.from_data(par_parsing, par_gaze, par_mapping, labels_selection)
            )
        
        return cls(user_id, article_id, corpus, article.query.strip(), paragraphs)

    @property
    def user_id(self) -> str:
        return self._user_id

    @property
    def id(self) -> str:
        return self._id

    @property
    def corpus(self) -> str:
        return self._corpus.value

    @property
    def paragraphs(self) -> List[ParagraphModel]:
        return self._paragraphs

    @property
    def fixations(self) -> List[FixationEvent]:
        pars_fixations = [par.fixations for par in self._paragraphs]
        return sum(pars_fixations, [])

    @property
    def saccades(self) -> List[SaccadeEvent]:
        pars_saccades = [par.saccades for par in self._paragraphs]
        return sum(pars_saccades, [])


class DocumentSchema(Schema):
    """

    """
    user_id = fields.Str(data_key="userId")
    id = fields.Str()
    corpus = fields.Str()
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphSchema))
