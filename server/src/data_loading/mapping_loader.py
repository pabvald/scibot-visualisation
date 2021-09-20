import os
import glob
import pandas as pd

from os.path import join as pjoin


class ScibotMappingLoader:
    _LABELS_EXT = '*_labels.csv'
    _PARS_EXT = '*_paragraphs.csv'
    _INCLUDE_DATA_SOURCE = []  # "g_rel", "GoogleNQ"
    _STUDY_TYPE = ["main"]  # "main", "train"

    grel_labels = {}
    grel_paragraphs = {}
    google_nq_labels = {}
    google_nq_paragraphs = {}

    def __init__(self, data_dir: str, googleNQ: bool = True, gREL: bool = True):
        """

        Args:
            data_dir: directory containing the mapping files.
            googleNQ: determines if the mappings of the GoogleNQ files are included.
            gREL: determines if the mappings of the g-REL articles are included.
        """
        super().__init__()

        self.data_dir = data_dir
        if googleNQ:
            self._INCLUDE_DATA_SOURCE.append("GoogleNQ")
        if gREL:
            self._INCLUDE_DATA_SOURCE.append("g-REL")

        self._load_data()

    def _load_data(self):
        """ Loads the specified data"""
        if "g-REL" in self._INCLUDE_DATA_SOURCE:
            self._load_grel()
        if "GoogleNQ" in self._INCLUDE_DATA_SOURCE:
            self._load_google_nq()

    def _load_grel(self):
        """ Loads the mappings of the g-REL files """
        paths = [pjoin(self.data_dir, "g-rel", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            # read labels' mapping
            for filename in glob.glob(pjoin(path, self._LABELS_EXT)):
                doc_id = os.path.split(filename)[-1][:-(len(self._LABELS_EXT) + 1)]
                data = self._load_mapping(filename)
                self.grel_labels[doc_id] = data

            # read paragraphs' mapping
            for filename in glob.glob(pjoin(path, self._PARS_EXT)):
                doc_id = os.path.split(filename)[-1][:-(len(self._PARS_EXT) + 1)]
                data = self._load_mapping(filename)
                self.grel_paragraphs[doc_id] = data

    def _load_google_nq(self):
        """ Loads the mappings of the GoggleNQ files """
        paths = [pjoin(self.data_dir, "GoogleNQ", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            # read labels' mapping
            for filename in glob.glob(pjoin(path, self._LABELS_EXT)):
                doc_id = os.path.split(filename)[-1][:-(len(self._LABELS_EXT) + 1)]
                data = self._load_mapping(filename)
                self.google_nq_labels[doc_id] = data

            # read paragraphs' mapping
            for filename in glob.glob(pjoin(path, self._PARS_EXT)):
                doc_id = os.path.split(filename)[-1][:-(len(self._PARS_EXT) + 1)]
                data = self._load_mapping(filename)
                self.google_nq_paragraphs[doc_id] = data

    @staticmethod
    def _load_mapping(path: str):
        """ Reads a file containing a mapping into a Pandas dataframe """
        return pd.read_csv(path, delimiter="|", encoding='utf-8', float_precision='round_trip', na_values="None")
