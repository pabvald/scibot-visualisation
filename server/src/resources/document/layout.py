from flask import jsonify
from flask_restful import Resource
from flask import current_app as app
from werkzeug.exceptions import NotFound

from models import Corpus
from errors import error_messages
from src.resources.user.list import USER_IDS
from models.document import DocumentLayoutModel, DocumentLayoutSchema

from .list import DOC_IDS


class DocumentLayoutResource(Resource):
    """ Document + Layout resource """

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
        document = DocumentLayoutModel(user_id=user_id,
                                       doc_id=doc_id,
                                       query=article.query.strip(),
                                       pars_mapping=pars_mapping,
                                       labels_mapping=labels_mapping)
        # serialize document
        serialized_document = DocumentLayoutSchema().dump(document)
        return jsonify(serialized_document)
