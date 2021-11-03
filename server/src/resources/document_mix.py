
class DocumentMixResource(Resource):
    """ Document resource """

    _fixation_service = FixationService()
    _relevance_service = RelevanceService()

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
            return {'message': f"The id '{user_id}' does not correspond to any user"}, 404

        if doc_id not in DOC_IDS:
            return {'message': f"The id '{doc_id}' does not correspond to any document"}, 404

        if hit_left_margin < 0:
            return {'message': "The hit left margin cannot be negative"}, 400

        if hit_right_margin < 0:
            return {'message': "The hit right margin cannot be negative"}, 400

        corpus = Corpus.grel if doc_id.startswith("g-rel") else Corpus.nq

        if corpus == Corpus.grel:
            # HTML parsed article
            article = app.dataloader.grel_articles[doc_id]
            # gaze data
            gaze = app.dataloader.grel_reading[user_id][doc_id[:-2]]['dataframe']
            # paragraph features
            pars_features = app.featuresloader.grel_par_features[user_id].get(doc_id[:-2], {})
            # relevance
            system_relevance = app.dataloader.grel_reading[user_id][doc_id[:-2]]['system_relevance']
            perceived_relevance = app.dataloader.grel_reading[user_id][doc_id[:-2]]['perceived_relevance']
            # mappings
            pars_mapping = app.mappingloader.grel_paragraphs[doc_id[:-2]]
            labels_mapping = app.mappingloader.grel_labels[doc_id[:-2]]

        else:
            # HTML parsed article
            article = app.dataloader.google_nq_articles[doc_id]
            # gaze data
            gaze = app.dataloader.google_nq_reading[user_id][doc_id]['dataframe']
            # paragraph features
            pars_features = app.featuresloader.google_nq_par_features[user_id].get(doc_id, {})
            # relevance
            system_relevance = app.dataloader.google_nq_reading[user_id][doc_id]['system_relevance']
            perceived_relevance = app.dataloader.google_nq_reading[user_id][doc_id]['perceived_relevance']
            # mappings
            pars_mapping = app.mappingloader.google_nq_paragraphs[doc_id]
            labels_mapping = app.mappingloader.google_nq_labels[doc_id]

        # predict relevance
        pred_relevance = self._relevance_service.predict_relevance(pars_features, corpus)

        # create document representation
        document = DocumentModel.from_data(user_id=user_id, article=article, gaze_data=gaze, pars_mapping=pars_mapping,
                                           labels_mapping=labels_mapping, system_relevance=system_relevance,
                                           perceived_relevance=perceived_relevance, pred_relevance=pred_relevance,
                                           pars_features=pars_features)

        # compute fixations on the document's labels
        self._fixation_service.compute_horizontal_hits(document, hit_left_margin, hit_right_margin)
        # serialize document
        serialized_document = DocumentSchema().dump(document)
        return jsonify(serialized_document)
