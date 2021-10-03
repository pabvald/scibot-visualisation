import os
from os.path import join as pjoin


class Config(object):
    DEBUG = True
    DEVELOPMENT = True
    # SECRET_KEY = ''
    # FLASK_HTPASSWD_PATH = '/secret/.htpasswd'
    # FLASK_SECRET = SECRET_KEY
    # DB_HOST = 'database' # a docker link

    # Data versions
    GAZE_VERSION = 'v05'
    MAPPING_VERSION = 'v04'

    # Paths
    DIR = os.path.dirname(__file__)
    DATA_DIR = pjoin(DIR, 'data')
    GAZE_DIR = pjoin(DATA_DIR, 'gaze', GAZE_VERSION)
    ARTICLE_DIR = pjoin(DATA_DIR, 'articles')
    MAPPING_DIR = pjoin(DATA_DIR, 'mapping', MAPPING_VERSION)
    PAR_FEATURES_DIR = pjoin(DATA_DIR, 'paragraph_features')
    
    # Study's screen dimensions
    SCREEN_WIDTH = 2560
    SCREEN_HEIGHT = 1440


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    # DB_HOST = 'my.production.database' # not a docker link




