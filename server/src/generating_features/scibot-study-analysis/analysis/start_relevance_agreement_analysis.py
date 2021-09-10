from data_loading.data_loader import SciBot_DataLoader
from analysis.analysis_helper import compute_fleiss_kappa, compute_cohens_kappas
import logging
import pandas as pd
import numpy as np


def get_relevance_ratings(google_nq_data=None, grel_data=None):
    res = {"googleNQ": None, "gREL": None}
    system_index = "system"

    if grel_data:
        user_ids = list(grel_data.keys())
        # num_users = len(user_ids)
        docs = list(grel_data[user_ids[0]].keys())
        # num_docs = len(docs)

        # assemble perceived relevance ratings for all users and paragraphs
        extracted_system_relevance = False
        grel_agree_df = pd.DataFrame(columns=[system_index] + user_ids, index=docs)
        for user_id, user_ratings in grel_data.items():
            for doc_id, doc_rating in user_ratings.items():
                grel_agree_df.at[doc_id, user_id] = doc_rating["perceived_relevance"][0]
                if not extracted_system_relevance:
                    grel_agree_df.at[doc_id, system_index] = doc_rating["system_relevance"][0]
            extracted_system_relevance = True
        res["gREL"] = grel_agree_df

    if google_nq_data:
        user_ids = list(google_nq_data.keys())
        # num_users = len(user_ids)
        user_rating = google_nq_data[user_ids[0]]
        # num_docs = len(user_rating)

        paragraphs = []
        for doc, doc_rating in user_rating.items():
            num_p = doc_rating["num_paragraphs"]
            paragraphs.extend(["{}_p{}".format(doc, i) for i in range(num_p)])
        # num_paragraphs = len(paragraphs)

        # assemble perceived relevance ratings for all users and paragraphs
        extracted_system_relevance = False
        nq_agree_df = pd.DataFrame(columns=[system_index] + user_ids, index=paragraphs)
        for user_id, user_ratings in google_nq_data.items():
            for doc_id, paragraph_ratings in user_ratings.items():
                for i, p_rating in enumerate(paragraph_ratings["perceived_relevance"]):
                    nq_agree_df.at["{}_p{}".format(doc_id, i), user_id] = p_rating
                if not extracted_system_relevance:
                    for i, p_rating in enumerate(paragraph_ratings["system_relevance"]):
                        nq_agree_df.at["{}_p{}".format(doc_id, i), system_index] = p_rating
            extracted_system_relevance = True
        res["googleNQ"] = nq_agree_df

        return res


def check_for_nan_cols(df):
    nan_cols = [df[c].name for c in df.columns if df[c].hasnans]
    if len(nan_cols) > 0:
        logging.error("irregular relevance ratings for users: {}".format(nan_cols))
        assert len(nan_cols) == 0


def relevance_agreement(ratings):
    check_for_nan_cols(ratings)
    logging.info("n={} including system relevance".format(ratings.shape[1]))

    # extract descriptive statistics from the perceived and system ratings
    num_relevant_system = ratings.iloc[:, 0].sum()
    num_relevant_raters = ratings.iloc[:, 1:].sum().values
    num_relevant_raters_mean, num_relevant_raters_sd = np.mean(num_relevant_raters), np.std(num_relevant_raters)
    logging.info("Number of relevant paragraphs, in the corpus: {}, as rated by users: M={:0.2f}, SD={:0.3f}"
                 .format(num_relevant_system, num_relevant_raters_mean, num_relevant_raters_sd))

    # use Fleiss' kappa to determine the inter-rater agreement
    fleiss_kappa_nq = compute_fleiss_kappa(ratings)
    logging.info("Fleiss' kappa: {:0.3f}".format(fleiss_kappa_nq))

    # use Cohens' kappa between perceived and system relevance to estimate rater-corpus agreement
    cohens_kappas, cohens_kappa_details = compute_cohens_kappas(ratings)
    cohens_kappa_mean, cohens_kappa_sd = np.mean(cohens_kappas), np.std(cohens_kappas)
    logging.info("Cohens' kappa: M={:0.3f}, SD={:0.3f}".format(cohens_kappa_mean, cohens_kappa_sd))


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    # LOAD RELEVANCE RATINGS
    data_dir = "C:/Users/miba01/dfki.de/Team_SciBot - General/out_07.12.2020_incl_rating/"
    logging.info("loading data from {}".format(data_dir))
    dataloader = SciBot_DataLoader(data_dir=data_dir, exclude_users=["A02", "A05"], gaze_data=False)
    relevance_ratings = get_relevance_ratings(google_nq_data=dataloader.google_nq_reading,
                                              grel_data=dataloader.grel_reading)

    # ANALYZE GoogleNQ
    logging.info("### Start analysis for GoogleNQ...")
    nq_relevance_ratings = relevance_ratings["googleNQ"]
    relevance_agreement(nq_relevance_ratings)

    # ANALYZE gREL
    logging.info("### Start analysis for gREL...")
    grel_relevance_ratings = relevance_ratings["gREL"]
    relevance_agreement(grel_relevance_ratings)


    pass
