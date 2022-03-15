from flask import jsonify
from flask_restful import Resource
from flask import current_app as app
from werkzeug.exceptions import NotFound

from src.models import Corpus
from src.errors import error_messages
from src.resources.user.list import USER_IDS
from src.models.document import Document, DocumentLayoutSchema

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
            article = app.article_loader.grel[doc_id]
            # layouts
            pars_layout = app.layout_loader.grel_paragraphs[doc_id[:-2]]
            labels_layout = app.layout_loader.grel_labels[doc_id[:-2]]

        else:
            # HTML parsed article
            article = app.article_loader.google_nq[doc_id]
            # layouts
            pars_layout = app.layout_loader.google_nq_paragraphs[doc_id]
            labels_layout = app.layout_loader.google_nq_labels[doc_id]

        # create document representation
        document = Document.from_layout(user_id=user_id,
                                        doc_id=doc_id,
                                        corpus=corpus,
                                        query=article.query.strip(),
                                        pars_layout=pars_layout,
                                        labels_layout=labels_layout)
        # serialize document
        serialized_document = DocumentLayoutSchema().dump(document)
        return jsonify(serialized_document)
