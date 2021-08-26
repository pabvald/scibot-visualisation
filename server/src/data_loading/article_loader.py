import codecs
import pandas as pd
from html.parser import HTMLParser
from config import MAPPING_DIR, ARTICLES_DIR
from models import Article, Paragraph
from os.path import join as pjoin


class ArticleLoader(HTMLParser):

    def error(self, message):
        pass

    def __init__(self):
        super().__init__()
        self.article = None
        self.query = False
        self.title = False
        self.title_tag = ""
        self.paragraph = False
        self.rating = True
        self.answer = False
        self.article_path = ""
        self.pars_mapping_path = ""
        self.labels_mapping_path = ""
        self.pars_mapping = None
        self.labels_mapping = None

    def _load_mapping(self):
        self.pars_mapping = pd.read_csv(self.pars_mapping_path, delimiter="|", encoding='utf-8',
                                        float_precision='round_trip', na_values="None")
        self.labels_mapping = pd.read_csv(self.labels_mapping_path, delimiter="|", encoding='utf-8',
                                          float_precision='round_trip', na_values="None")

    def load_article(self, corpus: str, article_id: str):
        self.query = False
        self.title = False
        self.title_tag = ""
        self.paragraph = False
        self.rating = True
        self.answer = False
        self.article_path = pjoin(ARTICLES_DIR, corpus, 'main', article_id + '.html')
        self.pars_mapping_path = pjoin(MAPPING_DIR, corpus, 'main', article_id + '_paragraphs.csv')
        self.labels_mapping_path = pjoin(MAPPING_DIR, corpus, 'main', article_id + '_labels.csv')

        self._load_mapping()
        with codecs.open(self.article_path, "r", "utf-8") as file:
            page = file.read()
            self.article = Article(article_id, corpus)
            self.feed(page)

        return self.article

    def handle_starttag(self, tag, attrs):
        if tag == "h1":
            if attrs:
                self.query = True
            else:
                self.title = True
        elif tag == "p":
            self.paragraph = True
            if attrs:
                a, b = attrs[0]
                if a == 'rating' and b == 'false':
                    self.rating = False
                if a == "answer" and b == "true":
                    self.answer = True
        elif tag == "h2" or tag == "h3":
            self.title = True
            self.title_tag = tag

    def handle_endtag(self, tag):
        pass

    def handle_data(self, data):
        if not data.strip():
            return
        if self.query:
            self.article.query = data
            self.query = False
        elif self.title:
            self.article.add_title(title_text=data, title_tag=self.title_tag,
                                   pars_mapping=self.pars_mapping, labels_mapping=self.labels_mapping)
            self.title_tag = ""
            self.title = False
        elif self.paragraph:
            self.article.add_paragraph(text=data, rating=self.rating, answer=self.answer,
                                       pars_mapping=self.pars_mapping, labels_mapping=self.labels_mapping)
            self.rating = True
            self.paragraph = True
            self.answer = False
