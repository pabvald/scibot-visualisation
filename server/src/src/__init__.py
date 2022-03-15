from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api



# --- APP initialization ---
app = Flask(__name__)
CORS(app)  # allow CORS
app.config.from_object('src.config.Config')  # load configuration
app.config["APPLICATION_ROOT"] = "/demos/rematool"

from src.data_loading import (ScibotGazeLoader, ScibotArticleLoader, ScibotLayoutLoader, ScibotParagraphFeaturesLoader)

from src.resources.user.list import UserListResource
from src.resources.document.list import DocumentListResource
from src.resources.document.layout import DocumentLayoutResource
from src.resources.document.features import DocumentFeaturesResource
from src.resources.document.relevance import DocumentRelevanceResource
from src.resources.document.fix_duration import DocumentFixDurationResource


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
