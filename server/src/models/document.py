import os

from enum import Enum
from typing import Any, List, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from data_loading.article_parser import Article
from features import FixationEvent, SaccadeEvent
from .paragraph import ParagraphModel, ParagraphSchema


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
                  labels_mapping: DataFrame, system_relevance: List[bool], perceived_relevance: List[bool],
                  pred_relevance: Dict, pars_features: Dict):
        paragraphs = []
        _, article_id = os.path.split(article.article_id)

        # determine corpus
        corpus = Corpus.grel if article_id.startswith('g-rel') else Corpus.nq

        # combine the HTML, gaze and mapping data to create the paragraphs
        par_ids = pars_mapping['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_sys_rel = False
            par_percieved_rel = False

            if par_id >= 0:
                par_sys_rel = system_relevance[par_id]
                par_percieved_rel = perceived_relevance[par_id]

            par_pred_rel = pred_relevance.get(par_id, tuple([-1.0, False]))
            par_features = pars_features.get(par_id, {})
            par_gaze = gaze_data.loc[gaze_data['paragraph_id'] == par_id]
            par_mapping = list(pars_mapping.loc[pars_mapping['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == par_id]

            paragraphs.append(
                ParagraphModel.from_data(article_id=article_id,
                                         gaze_data=par_gaze,
                                         par_mapping=par_mapping, labels_mapping=labels_selection,
                                         system_relevance=par_sys_rel, perceived_relevance=par_percieved_rel,
                                         pred_relevance=par_pred_rel,
                                         features=par_features)
            )

        return cls(user_id, article_id, corpus, article.query.strip(), paragraphs)

    @property
    def id(self) -> str:
        return self._id

    @property
    def user_id(self) -> str:
        return self._user_id

    @property
    def query(self) -> str:
        return self._query

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
    user_id = fields.Str(data_key="userId")
    id = fields.Str()
    corpus = fields.Str()
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphSchema))
