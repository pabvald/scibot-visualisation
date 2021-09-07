import pandas as pd
from os.path import join as pjoin


class ScibotMappingLoader:
    _LABELS_EXT = '_labels.csv'
    _PARS_EXT = '_paragraphs.csv'
    _MODE = 'main'

    def __init__(self, mapping_dir: str, corpus: str, article_id: str):
        """

        Args:
            mapping_dir: directory containing the mapping files
            article_id: id of the article
        """
        super().__init__()

        self.labels_path = pjoin(mapping_dir, corpus, self._MODE, article_id + self._LABELS_EXT)
        self.pars_path = pjoin(mapping_dir, corpus, self._MODE, article_id + self._PARS_EXT)
        self.labels = self._load_mapping(self.labels_path)
        self.paragraphs = self._load_mapping(self.pars_path)

    @staticmethod
    def _load_mapping(path: str):
        """ Reads a file containing a mapping into a Pandas dataframe """
        return pd.read_csv(path, delimiter="|", encoding='utf-8',
                           float_precision='round_trip', na_values="None")
