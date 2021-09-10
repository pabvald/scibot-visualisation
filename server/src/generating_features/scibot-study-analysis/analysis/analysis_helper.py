from statsmodels.stats.inter_rater import fleiss_kappa, aggregate_raters, cohens_kappa, to_table
import pandas as pd
import numpy as np
import logging


def compute_fleiss_kappa(relevance_ratings: pd.DataFrame):
    """
    Computing Fleiss' kappa. Ignores system relevance (at column index 0).
    See https://statistics.laerd.com/spss-tutorials/fleiss-kappa-in-spss-statistics.php for reporting.
    See https://www.wikiwand.com/en/Fleiss%27_kappa for implementation hints.
    @param relevance_ratings: relevance ratings for a set of paragraphs with system relevance in the first column,
    raters in the remaining columns, and paragraphs in rows.
    @return: Fleiss' kappa
    """
    perceived_relevance_ratings = relevance_ratings.iloc[:, 1:].astype(dtype=np.int)  # removing system relevance
    table, _ = aggregate_raters(data=perceived_relevance_ratings, n_cat=2)  # 2 categories are True and False
    return fleiss_kappa(table=table, method="fleiss")


def compute_cohens_kappas(relevance_ratings: pd.DataFrame):
    """
    Computing Cohens' kappa for each human rater and the system rating of relevance.
    See https://statistics.laerd.com/spss-tutorials/cohens-kappa-in-spss-statistics.php for reporting.
    @param relevance_ratings: relevance ratings for a set of paragraphs with system relevance in the first column,
    raters in the remaining columns, and paragraphs in rows.
    @return: Cohens' kappa results per rater (list)
    """
    system_relevance_rating = relevance_ratings.iloc[:, 0].astype(dtype=np.int)
    perceived_relevance_ratings = relevance_ratings.iloc[:, 1:].astype(dtype=np.int)

    kappa_results = []
    for c in perceived_relevance_ratings.columns:
        paired_ratings = pd.DataFrame(data={system_relevance_rating.name: system_relevance_rating,
                                            perceived_relevance_ratings[c].name: perceived_relevance_ratings[c]})

        table, _ = to_table(paired_ratings, bins=2)
        kappa_results.append(cohens_kappa(table=table))
        # logging.debug(perceived_relevance_ratings[c].name + ": " + str(kappa_results[-1]))

    return [r.kappa for r in kappa_results], kappa_results
