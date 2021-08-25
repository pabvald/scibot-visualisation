import pandas as pd

from config import MAPPING_DIR
from models import Article, Paragraph, Label
from os.path import join as pjoin


class ArticleLoader:

    def __init__(self, corpus: str, name: str):
        self.article = None
        self.corpus = corpus
        self.name = name
        self.pars_path = pjoin(MAPPING_DIR, corpus, 'main', name + '.html_paragraphs.csv')
        self.labels_path = pjoin(MAPPING_DIR, corpus, 'main', name + '.html_labels.csv')

        self._load_article()

    def _load_article(self):
        # Load paragraphs' mapping
        par_mapping = pd.read_csv(self.pars_path, delimiter="|", encoding='utf-8', float_precision='round_trip',
                                 na_values="None")

        # Load labels' mapping
        labels_mapping = pd.read_csv(self.labels_path, delimiter="|", encoding='utf-8', float_precision='round_trip',
                             na_values="None")

        # Generate paragraphs
        paragraphs = []
        for i, par_mapping in par_mapping.iterrows():
            par_labels = [] 
            par_id, par_x1, par_y1, par_x2, par_y2 = par_mapping
            labels_selection = labels_mapping.loc[labels_mapping['paragraph_id'] == par_id]
            paragraphs.append(Paragraph.from_mapping(par_mapping, labels_selection))

        # Generate article
        self.article = Article(self.corpus, self.name, paragraphs)


