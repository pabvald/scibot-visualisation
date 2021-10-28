from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api
from resources.user import UserListResource
from data_loading import (SciBotDataLoader, ScibotMappingLoader,
                          ScibotParagraphFeaturesLoader)
from resources.document import DocumentResource, DocumentListResource

app = Flask(__name__)
app.config.from_object('config.Config')  # load configuration
app.config["APPLICATION_ROOT"] = "/demos/rematool"
app.dataloader = SciBotDataLoader(data_dir=app.config['GAZE_DIR'], article_dir=app.config['ARTICLE_DIR'])
app.mappingloader = ScibotMappingLoader(data_dir=app.config['MAPPING_DIR'])
app.featuresloader = ScibotParagraphFeaturesLoader(data_dir=app.config['PAR_FEATURES_DIR'])

api = Api(app)
CORS(app)  # allow CORS

# --- API calls ---
api.add_resource(UserListResource, '/api/user/ids')
api.add_resource(DocumentListResource, '/api/document/ids')
api.add_resource(DocumentResource, '/api/document/<string:user_id>/<string:doc_id>')


# --- Serve index.html ---
@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5001)
