import os

from enum import Enum
from pandas.core.frame import DataFrame
from models.paragraph import ParagraphModel, ParagraphSchema
from marshmallow import Schema, fields
from typing import Any, List, Dict

from models import paragraph
from data_loading.article_parser import Article


class Corpus(Enum):
    grel = "g-REL"
    nq = "GoogleNQ"


class DocumentModel(object):
    """Document Representation"""

    def __init__(self, user_id: str, article_id: str, corpus: str, query: str,
                 paragraphs: List[ParagraphModel]):
        self.user_id = user_id
        self.id = article_id
        self.corpus = corpus
        self.query = query
        self.paragraphs = paragraphs

    @classmethod 
    def from_data(cls, user_id: str, article: Article, gaze_data: DataFrame, pars_mapping: DataFrame,
                  labels_mapping: DataFrame):
        paragraphs = []
        _, article_id = os.path.split(article.article_id)

        # determine corpus
        corpus =  Corpus.grel if article_id.startswith('g-rel') else Corpus.nq

        # combine the HTML, gaze and mappping data to create the pararagrahs
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
        
        return cls(user_id, article_id, corpus.value, article.query.strip(), paragraphs)


class DocumentSchema(Schema):
    user_id = fields.Str()
    id = fields.Str()
    corpus = fields.Str()
    query = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphSchema))
