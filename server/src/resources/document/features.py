from flask import jsonify
from flask import current_app as app
from flask_restful import Resource

from models import Corpus
from models.document import DocumentFeaturesModel, DocumentFeaturesSchema

from src.resources.user.list import USER_IDS
from .list import DOC_IDS


class DocumentFeaturesResource(Resource):
    """ Document features resource """

    def get(self, user_id, doc_id):
        """
        Obtain a document.
        Args:
            user_id: user id
            doc_id: document id
        """

        if user_id not in USER_IDS:
            return {'message': f"The id '{user_id}' does not correspond to any user"}, 404

        if doc_id not in DOC_IDS:
            return {'message': f"The id '{doc_id}' does not correspond to any document"}, 404

        corpus = Corpus.grel if doc_id.startswith("g-rel") else Corpus.nq

        if corpus == Corpus.grel:
            # HTML parsed article
            article = app.dataloader.grel_articles[doc_id]
            # paragraph features
            pars_features = app.featuresloader.grel_par_features[user_id].get(doc_id[:-2], {})

        else:
            # HTML parsed article
            article = app.dataloader.google_nq_articles[doc_id]
            # paragraph features
            pars_features = app.featuresloader.google_nq_par_features[user_id].get(doc_id, {})

        # create document representation
        document = DocumentFeaturesModel(user_id=user_id,
                                         doc_id=doc_id,
                                         query=article.query.strip(),
                                         pars_features=pars_features)
        # serialize document
        serialized_document = DocumentFeaturesSchema().dump(document)
        return jsonify(serialized_document)
