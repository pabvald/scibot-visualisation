from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from resources.user import UserListResource
from data_loading import SciBotDataLoader, ScibotMappingLoader
from resources.document import DocumentResource, DocumentListResource

app = Flask(__name__)
app.config.from_object('config.Config')  # load configuration
app.dataloader = SciBotDataLoader(data_dir=app.config['GAZE_DIR'], article_dir=app.config['ARTICLE_DIR'])
app.mappingloader = ScibotMappingLoader(data_dir=app.config['MAPPING_DIR'])

api = Api(app)
CORS(app)  # allow CORS

# --- API calls ---
api.add_resource(UserListResource, '/api/user/ids')
api.add_resource(DocumentListResource, '/api/document/ids')
api.add_resource(DocumentResource, '/api/document/<string:user_id>/<string:doc_id>')

if __name__ == '__main__':
    app.run(port=5002)
