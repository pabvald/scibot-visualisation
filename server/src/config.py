import os
import sys
from os.path import join as pjoin

# Data versions
GAZEDATA_VERSION = 'v05'

# Paths
DIR = os.path.dirname(__file__)
DATA_DIR = pjoin(DIR, 'data')
GAZE_DIR = pjoin(DATA_DIR, 'gaze')
ARTICLES_DIR = pjoin(DATA_DIR, 'articles')
MAPPING_DIR = pjoin(DATA_DIR, 'mapping')

# Study dimensions
STUDY_WIDTH = 2560
STUDY_HEIGHT = 1440

