from flask import jsonify

from data_loading import data_loader
from .user import USER_IDS
from os.path import join as pjoin
from flask_restful import Resource
from models import DocumentModel, DocumentSchema
from data_loading.data_loader import SciBot_DataLoader 
from data_loading.mapping_loader import ScibotMappingLoader
from config import ARTICLES_DIR, GAZEDATA_VERSION, GAZE_DIR, MAPPING_DIR


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

        corpus = "g-REL" if doc_id.startswith("g-rel") else "GoogleNQ"
        dl = SciBot_DataLoader(pjoin(GAZE_DIR, GAZEDATA_VERSION), gaze_data=True, googleNQ=(corpus == "GoogleNQ"),
                               gREL=(corpus == "g-REL"), include_users=[user_id], article_dir=ARTICLES_DIR)
        ml = ScibotMappingLoader(MAPPING_DIR, corpus, doc_id)

        if corpus == "g-REL":
            article = dl.grel_articles[doc_id]
            gaze = dl.grel_reading[user_id][doc_id[:-2]]['dataframe']
        else:
            article = dl.google_nq_articles[doc_id]
            gaze = dl.google_nq_reading[user_id][doc_id]['dataframe']

        print("Mapping  paragraphs = \n", ml.paragraphs)
        print("Article {} has {} paragraphs".format(article.file_name, len(article.paragraphs)))
        document = DocumentModel.from_data(user_id, article, gaze, ml.paragraphs, ml.labels)
        serialized_document = DocumentSchema().dump(document)
        return jsonify(serialized_document)


class DocumentList(Resource):
    """ List of Document ids """

    def get(self):
        """ Obtain the list of document ids """
        return jsonify(DOC_IDS)
