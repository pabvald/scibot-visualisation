from .paragraph import Paragraph, ParagraphSchema
from marshmallow import Schema, fields
from typing import List


class Article(object):
    """
    Represents an article.
    """
    def __init__(self, corpus: str, name: str, paragraphs: List[Paragraph]):
        """
        Args:
            name: name of the article, without the file extension
            corpus: `g-REL` or `Google_NQ`
        """
        self.corpus = corpus
        self.name = name
        self.paragraphs = paragraphs


class ArticleSchema(Schema):
    name = fields.Str()
    corpus = fields.Str()
    paragraphs = fields.List(fields.Nested(ParagraphSchema))
