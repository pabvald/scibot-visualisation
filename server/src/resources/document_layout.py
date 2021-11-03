from flask import jsonify
from flask_restful import Resource, reqparse

from .user_list import USER_IDS
from .document_list import DOC_IDS
from flask import current_app as app
from models import Corpus
from models.document import DocumentLayoutModel, DocumentLayoutSchema


class DocumentLayoutResource(Resource):
    """ Document resource """

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
            # mappings
            pars_mapping = app.mappingloader.grel_paragraphs[doc_id[:-2]]
            labels_mapping = app.mappingloader.grel_labels[doc_id[:-2]]

        else:
            # HTML parsed article
            article = app.dataloader.google_nq_articles[doc_id]
            # mappings
            pars_mapping = app.mappingloader.google_nq_paragraphs[doc_id]
            labels_mapping = app.mappingloader.google_nq_labels[doc_id]

        # create document representation
        document = DocumentLayoutModel.from_data(user_id=user_id,
                                                 doc_id=doc_id,
                                                 article=article,
                                                 pars_mapping=pars_mapping,
                                                 labels_mapping=labels_mapping)
        # serialize document
        serialized_document = DocumentLayoutSchema().dump(document)
        return jsonify(serialized_document)
