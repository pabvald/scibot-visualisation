from flask import jsonify
from flask_restful import Resource
from .user import USER_IDS
from data_loading import ArticleLoader
from models import Document, DocumentSchema

DOC_IDS = ["g-rel_q075-1_i",
           "g-rel_q076-1_r",
           "g-rel_q128-1_r",
           "g-rel_q085-2_i",
           "g-rel_q094-2_t",
           "g-rel_q097-2_t",
           "g-rel_q103-1_i",
           "g-rel_q116-1_r",
           "g-rel_q118-1_r",
           "g-rel_q122-2_i",
           "g-rel_q134-3_t",
           "g-rel_q088-1_t",
           "g-rel_q088-1_t",
           "nq_5p_a0_LTcw",
           "nq_5p_a0_LTIz",
           "nq_5p_a2_MTgz",
           "nq_5p_a3_LTYx",
           "nq_5p_a4_LTI3",
           "nq_6p_a1_LTEy",
           "nq_6p_a3_MzA5",
           "nq_6p_a4_ODQz",
           "nq_6p_a5_LTkw",
           "nq_7p_a1_Mzgy",
           "nq_7p_a2_LTYz",
           "nq_7p_a5_NTE0",
           "nq_7p_a5_NTE0"]


class Document(Resource):
    """
    Document resource.
    """

    def get(self, user_id, doc_id):
        """
        Obtain a document.
        Args:
            user_id: user id
            doc_id: document id
        """
        if user_id not in USER_IDS:
            return {'message': "The id '{}' does not correspond to any user".format(
                user_id)}, 404

        if doc_id not in DOC_IDS:
            return {'message': "The id '{}' does not correspond to any document".format(
                doc_id)}, 404

        corpus = 'g-REL' if doc_id.startswith('g-rel') else 'Google_NQ'
        loaded_article = ArticleLoader().load_article(corpus, doc_id)
        serialized_article = DocumentSchema().dump(loaded_article)
        return jsonify(serialized_article)


class DocumentList(Resource):
    """ List of Document ids """

    def get(self):
        """ Obtain the list of document ids """
        return jsonify(DOC_IDS)
