from flask import jsonify
from flask_restful import Resource
from flask import current_app as app
from werkzeug.exceptions import NotFound

from models import Corpus
from errors import error_messages
from resources.user.list import USER_IDS
from services.relevance_service import RelevanceService
from models.document import DocumentRelevanceModel, DocumentRelevanceSchema

from .list import DOC_IDS


class DocumentRelevanceResource(Resource):
    """ Document relevance resource """

    _relevance_service = RelevanceService()

    def get(self, user_id, doc_id):
        """
        Obtain a document.
        Args:
            user_id: user id
            doc_id: document id
        """

        if user_id not in USER_IDS:
            raise NotFound(description=error_messages['UserDoesNotExist'])

        if doc_id not in DOC_IDS:
            raise NotFound(description=error_messages['DocumentDoesNotExist'])

        corpus = Corpus.grel if doc_id.startswith("g-rel") else Corpus.nq

        if corpus == Corpus.grel:
            # paragraph features
            pars_features = app.features_loader.grel_par_features[user_id].get(doc_id[:-2], {})
            # system and perceived relevance
            system_relevance = app.gaze_loader.grel[user_id][doc_id[:-2]]['system_relevance']
            perceived_relevance = app.gaze_loader.grel[user_id][doc_id[:-2]]['perceived_relevance']

        else:
            # paragraph features
            pars_features = app.features_loader.google_nq_par_features[user_id].get(doc_id, {})
            # system and perceived relevance
            system_relevance = app.gaze_loader.google_nq[user_id][doc_id]['system_relevance']
            perceived_relevance = app.gaze_loader.google_nq[user_id][doc_id]['perceived_relevance']

        # predicted relevance
        pred_relevance = self._relevance_service.predict_relevance(pars_features, corpus)

        # create document representation
        document = DocumentRelevanceModel(user_id=user_id,
                                          doc_id=doc_id,
                                          corpus=corpus,
                                          system_relevance=system_relevance,
                                          perceived_relevance=perceived_relevance,
                                          predicted_relevance=pred_relevance)
        # serialize document
        serialized_document = DocumentRelevanceSchema().dump(document)
        return jsonify(serialized_document)
