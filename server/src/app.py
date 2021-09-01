from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api
from resources.user import UserList
from resources.document import Document, DocumentList

app = Flask(__name__)
api = Api(app)
CORS(app)  # allow CORS

# --- API calls ---
api.add_resource(UserList, '/api/user/ids')
api.add_resource(DocumentList, '/api/document/ids')
api.add_resource(Document, '/api/document/<string:user_id>/<string:doc_id>')

if __name__ == '__main__':
    app.run(port=5002, debug=True)
