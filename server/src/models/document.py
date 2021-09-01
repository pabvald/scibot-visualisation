from .paragraph import Paragraph, ParagraphSchema
from marshmallow import Schema, fields
from typing import List


class Document(object):
    """Article Representation"""

    def __init__(self, article_id: str, corpus: str):
        self.id = article_id
        self.query = ""
        self.paragraphs = []
        self._para_count = -1

    def add_paragraph(self, text, rating, answer, pars_mapping, labels_mapping):
        par_mapping = pars_mapping.loc[pars_mapping['paragraph_id'] == self._para_count].to_numpy()[0]
        labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == self._para_count]
        paragraph = Paragraph.from_mapping(par_mapping, labels_selection)
        if answer:
            paragraph.answer = True

        self.paragraphs.append(paragraph)
        self._para_count += 1

    def add_title(self, title_text, title_tag, pars_mapping, labels_mapping):
        pass


class DocumentSchema(Schema):
    id = fields.Str()
    corpus = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphSchema))
