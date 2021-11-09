from flask import jsonify
from flask_restful import Resource, reqparse
from flask import current_app as app
from werkzeug.exceptions import NotFound, BadRequest

from errors import error_messages
from models import Corpus
from services import FixationService
from resources.user.list import USER_IDS
from models.document import DocumentFixDurationModel, DocumentFixDurationSchema

from .list import DOC_IDS


parser = reqparse.RequestParser()
parser.add_argument('leftMargin', type=int, default=8)
parser.add_argument('rightMargin', type=int, default=14)


class DocumentFixDurationResource(Resource):
    """ Document + Layout resource """

    _fixation_service = FixationService()

    def get(self, user_id, doc_id):
        """
        Obtain a document.
        Args:
            user_id: user id
            doc_id: document id
        """
        args = parser.parse_args()
        hit_left_margin = args['leftMargin']
        hit_right_margin = args['rightMargin']

        if user_id not in USER_IDS:
            raise NotFound(description=error_messages['UserDoesNotExist'])

        if doc_id not in DOC_IDS:
            raise NotFound(description=error_messages['DocumentDoesNotExist'])

        if hit_left_margin < 0 or hit_right_margin < 0:
            raise BadRequest(description=error_messages['NegativeFixationAreaMargin'])

        corpus = Corpus.grel if doc_id.startswith("g-rel") else Corpus.nq

        if corpus == Corpus.grel:
            # mappings
            pars_mapping = app.mappingloader.grel_paragraphs[doc_id[:-2]]
            labels_mapping = app.mappingloader.grel_labels[doc_id[:-2]]
            # gaze data
            gaze = app.dataloader.grel_reading[user_id][doc_id[:-2]]['dataframe']

        else:
            # mappings
            pars_mapping = app.mappingloader.google_nq_paragraphs[doc_id]
            labels_mapping = app.mappingloader.google_nq_labels[doc_id]
            # gaze data
            gaze = app.dataloader.google_nq_reading[user_id][doc_id]['dataframe']

        # create document representation
        document = DocumentFixDurationModel(user_id=user_id,
                                            doc_id=doc_id,
                                            corpus=corpus,
                                            pars_mapping=pars_mapping,
                                            labels_mapping=labels_mapping,
                                            gaze_data=gaze)
        # compute fixations on the document's labels
        self._fixation_service.compute_horizontal_hits(document, hit_left_margin, hit_right_margin)

        # serialize document
        serialized_document = DocumentFixDurationSchema().dump(document)
        return jsonify(serialized_document)
