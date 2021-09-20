import os
import glob
import pandas as pd

from os.path import join as pjoin


class ScibotParagraphFeaturesLoader:
    _EXCLUDE_USER_LIST = []  # ["A02", "A05"]  # exclude A02 for g-REL only
    _INCLUDE_USER_LIST = []  # if emtpy every user besides excluded will be analysed, "A01", "B01"
    _INCLUDE_DATA_SOURCE = []  # "g_rel", "GoogleNQ"
    _STUDY_TYPE = ["main"]  # "main", "train"
    _COLUMN_SELECTION = ['paragraph_id',
                         'f_average_fixation_duration',
                         'f_average_forward_saccades_length',
                         'f_regression_ratio',
                         'f_thorough_reading_ratio',
                         'f_coherently_read_text_length']

    grel_par_features = {}
    google_nq_par_features = {}

    def __init__(self, data_dir: str, googleNQ: bool = True, gREL: bool = True,
                 include_users=None, exclude_users=None):
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
        if include_users is not None:
            assert isinstance(include_users, list)
            self._INCLUDE_USER_LIST = include_users
        if exclude_users is not None:
            assert isinstance(exclude_users, list)
            self._EXCLUDE_USER_LIST = exclude_users

        self._load_data()

    def _load_data(self):
        """ Loads the specified data"""
        if "g-REL" in self._INCLUDE_DATA_SOURCE:
            self._load_grel()
        if "GoogleNQ" in self._INCLUDE_DATA_SOURCE:
            self._load_google_nq()

    def _load_grel(self):
        """ Loads the mappings of the g-REL files """
        paths = [pjoin(self.data_dir, "g-REL", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            data = self._load_mapping(pjoin(path, 'g-rel_paragraph_features.csv'))
            for user in data.user.unique():
                if self._is_valid_user(user):
                    self.grel_par_features[user] = {}
                    for doc_id in data.loc[data['user'] == user, 'document']:
                        self.grel_par_features[user][doc_id] = data.loc[
                            (data['user'] == user) & (data['document'] == doc_id),  self._COLUMN_SELECTION]

    def _load_google_nq(self):
        """ Loads the mappings of the GoggleNQ files """
        paths = [pjoin(self.data_dir, "GoogleNQ", study_type) for study_type in self._STUDY_TYPE]

        for path in paths:
            data = self._load_mapping(pjoin(path, 'nq_paragraph_features.csv'))
            for user in data.user.unique():
                if self._is_valid_user(user):
                    self.google_nq_par_features[user] = {}
                    for doc_id in data.loc[data['user'] == user, 'document']:
                        self.google_nq_par_features[user][doc_id] = data.loc[
                            (data['user'] == user) & (data['document'] == doc_id), self._COLUMN_SELECTION]

    def _is_valid_user(self, user: str) -> bool:
        """
        Determine if a certain user has to be included

        Args:
            user: user's id
        """
        return user not in self._EXCLUDE_USER_LIST and (
                not self._INCLUDE_USER_LIST or user in self._INCLUDE_USER_LIST)

    @staticmethod
    def _load_mapping(path: str) -> pd.DataFrame:
        """ Reads a file containing a mapping into a Pandas dataframe """
        return pd.read_csv(path, delimiter=";", encoding='utf-8', float_precision='round_trip', na_values="None")
