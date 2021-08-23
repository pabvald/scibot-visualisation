from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'data': [{'id': 1, 'text': 'Hello'}, {'id': 2, 'text': 'Hi'}]}

api.add_resource(HelloWorld, '/hello-world') # Route_1

if __name__ == '__main__':
     app.run(port=5002)