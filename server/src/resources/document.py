from flask import jsonify

from data_loading import data_loader
from .user import USER_IDS
from os.path import join as pjoin
from flask_restful import Resource, reqparse
from models import DocumentModel, DocumentSchema
from services import FixationService
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

parser = reqparse.RequestParser()
parser.add_argument('hit_left_margin', type=int, default=8)
parser.add_argument('hit_right_margin', type=int, default=14)


class DocumentResource(Resource):
    """
    Document resource.
    """
    _fixation_service = FixationService()

    def get(self, user_id, doc_id):
        """
        Obtain a document.
        Args:
            user_id: user id
            doc_id: document id
        """
        args = parser.parse_args()
        hit_left_margin = args['hit_left_margin']
        hit_right_margin = args['hit_right_margin']

        if user_id not in USER_IDS:
            return {'message': f"The id '{user_id}' does not correspond to any user"}, 404

        if doc_id not in DOC_IDS:
            return {'message': f"The id '{doc_id}' does not correspond to any document"}, 404

        if hit_left_margin < 0:
            return {'message': "The hit left margin cannot be negative"}, 400

        if hit_right_margin < 0:
            return {'message': "The hit right margin cannot be negative"}, 400

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

        document = DocumentModel.from_data(user_id, article, gaze, ml.paragraphs, ml.labels)
        self._fixation_service.compute_horizontal_hits(document, hit_left_margin, hit_right_margin)
        serialized_document = DocumentSchema().dump(document)
        return jsonify(serialized_document)


class DocumentListResource(Resource):
    """ List of Document ids """

    def get(self):
        """ Obtain the list of document ids """
        return jsonify(DOC_IDS)
