from flask import jsonify
from flask_restful import Resource

USER_IDS = ['A01',
            'A03',
            'A04',
            'A06',
            'A07',
            'A08',
            'A09',
            'A10',
            'A11',
            'A12',
            'A13',
            'B01',
            'B02',
            'B03',
            'B04',
            'B05',
            'B06',
            'B07',
            'B08',
            'B09',
            'B10',
            'B11',
            'B12',
            'B13']


class UserList(Resource):
    """ List of user ids """

    def get(self):
        """ Obtain the list of user ids """
        return jsonify(USER_IDS)
