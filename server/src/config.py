import os
import sys
from os.path import join as pjoin


class Config(object):
    DEBUG = True
    DEVELOPMENT = True
    #SECRET_KEY = 'do-i-really-need-this'
    #FLASK_HTPASSWD_PATH = '/secret/.htpasswd'
    #FLASK_SECRET = SECRET_KEY
    #DB_HOST = 'database' # a docker link

    # Data versions
    GAZEDATA_VERSION = 'v05'

    # Paths
    DIR = os.path.dirname(__file__)
    DATA_DIR = pjoin(DIR, 'data')
    GAZE_DIR = pjoin(DATA_DIR, 'gaze', GAZEDATA_VERSION)
    ARTICLE_DIR = pjoin(DATA_DIR, 'articles')
    MAPPING_DIR = pjoin(DATA_DIR, 'mapping')

    # Study dimensions
    STUDY_WIDTH = 2560
    STUDY_HEIGHT = 1440


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    #DB_HOST = 'my.production.database' # not a docker link




