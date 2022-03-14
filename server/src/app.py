from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api

from data_loading import (ScibotGazeLoader, ScibotArticleLoader,
                          ScibotLayoutLoader, ScibotParagraphFeaturesLoader)

from resources.user.list import UserListResource
from resources.document.list import DocumentListResource
from resources.document.layout import DocumentLayoutResource
from resources.document.features import DocumentFeaturesResource
from resources.document.relevance import DocumentRelevanceResource
from resources.document.fix_duration import DocumentFixDurationResource


# --- APP initialization ---
app = Flask(__name__)
CORS(app)  # allow CORS
app.config.from_object('config.Config')  # load configuration

# --- Data loaders ---
app.article_loader = ScibotArticleLoader(data_dir=app.config['ARTICLE_DIR'])
app.gaze_loader = ScibotGazeLoader(data_dir=app.config['GAZE_DIR'])
app.layout_loader = ScibotLayoutLoader(data_dir=app.config['LAYOUT_DIR'])
app.features_loader = ScibotParagraphFeaturesLoader(data_dir=app.config['PAR_FEATURES_DIR'])

# --- API definition ---
api = Api(app)
api.add_resource(UserListResource,            '/api/user/ids')
api.add_resource(DocumentListResource,        '/api/document/ids')
api.add_resource(DocumentLayoutResource,      '/api/document/layout/<string:user_id>/<string:doc_id>')
api.add_resource(DocumentFeaturesResource,    '/api/document/features/<string:user_id>/<string:doc_id>')
api.add_resource(DocumentRelevanceResource,   '/api/document/relevance/<string:user_id>/<string:doc_id>')
api.add_resource(DocumentFixDurationResource, '/api/document/fixation/<string:user_id>/<string:doc_id>')


# --- Serve index.html ---
@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5001)
