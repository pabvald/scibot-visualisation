import os
import sys
from os.path import join as pjoin

# Data versions
GAZEDATA_VERSION = 'v05'

# Paths
DIR = os.path.dirname(__file__)
DATA_DIR = pjoin(DIR, 'data')
MAPPING_DIR = pjoin(DATA_DIR, 'mapping')
