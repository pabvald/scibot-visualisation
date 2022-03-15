import os
import codecs
from html.parser import HTMLParser


class ScibotArticleLoader:
    _INCLUDE_DATA_SOURCE = []  # "g_rel", "GoogleNQ"
    _STUDY_TYPE = ["main"]  # "main", "train"

    google_nq = {}
    grel = {}

    def __init__(self, data_dir: str, googleNQ: bool=True, gREL:bool =True):
        """

        Args:
            data_dir: directory containing the mapping files.
            googleNQ: determines if the mappings of the GoogleNQ files are included.
            gREL: determines if the mappings of the g-rel articles are included.
        """
        super().__init__()

        self.data_dir = data_dir
        if googleNQ:
            self._INCLUDE_DATA_SOURCE.append("GoogleNQ")
        if gREL:
            self._INCLUDE_DATA_SOURCE.append("g-rel")

        self._load_articles()

    def _load_articles(self):
        article_parser = ArticleParser()
        for data_source in self._INCLUDE_DATA_SOURCE:
            for study_type in self._STUDY_TYPE:
                folder_dir = os.path.join(self.data_dir, data_source, study_type)
                for file in os.listdir(folder_dir):
                    article_id = file[:-5]
                    if data_source == "GoogleNQ":
                        self.google_nq[article_id] = \
                            article_parser.parse_article(os.path.join(folder_dir, file))
                    else:
                        self.grel[article_id] = \
                            article_parser.parse_article(os.path.join(folder_dir, file))


class ArticleParser(HTMLParser):

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

    def parse_article(self, article_path):
        self.query = False
        self.title = False
        self.title_tag = ""
        self.paragraph = False
        self.rating = True
        self.answer = False
        with codecs.open(article_path, "r", "utf-8") as file:
            page = file.read()
            self.article = Article(file.name.split("/")[-1])
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
            self.article.set_query(data)
            self.query = False
        elif self.title:
            self.article.add_title(title_text=data, title_tag=self.title_tag)
            self.title_tag = ""
            self.title = False
        elif self.paragraph:
            self.article.add_paragraph(text=data, rating=self.rating, answer=self.answer)
            self.rating = True
            self.paragraph = True
            self.answer = False


class Article(object):
    """Article Representation"""

    def __init__(self, name):
        self._paragraphs = []
        self._content = []
        self._query = ""
        self._title = ""
        self._file_name = name
        self._para_count = 0
        self._answer_par = 0

    def set_query(self, query):
        self._query = query

    def add_paragraph(self, text, rating, answer):
        if answer:
            self._answer_par = self._para_count
        word_count = len(text.split(" "))
        self._paragraphs.append(
            {"type": "paragraph", "num": self._para_count, "answer": answer, "word_count": word_count, "text": text})
        self._content.append(
            {"type": "paragraph", "num": self._para_count, "answer": answer, "word_count": word_count, "text": text})
        self._para_count += 1

    def add_title(self, title_text, title_tag):
        if self._title == "":
            self._title = title_text
        else:
            self._content.append({"type": title_tag, "answer": False, "text": title_text})

    @property
    def query(self):
        return self._query

    @property
    def content(self):
        return self._content

    @property
    def num_answer(self):
        return self._answer_par

    @property
    def num_paragraph(self):
        return self._para_count

    @property
    def paragraphs(self):
        return self._paragraphs

    @property
    def title(self):
        return self._title

    @property
    def file_name(self):
        return self._file_name

    @property
    def article_id(self):
        return self._file_name[:-5]


if __name__ == '__main__':
    article_parser = ArticleParser()
    articles = []
    path = "/Users/ombh/DFKI_Projects/scibot-study-analysis/articles/GoogleNQ/main/"
    for file in os.listdir(path):
        articles.append(article_parser.parse_article(os.path.join(path, file)))

    print(articles)
