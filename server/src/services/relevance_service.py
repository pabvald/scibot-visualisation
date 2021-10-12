import random
import pickle
from joblib import load
import pathlib
import pandas as pd

from typing import List, Dict, Tuple


def load_demo_models():
    base_dir = pathlib.Path(__file__).parent.resolve()

    grel_model = load(base_dir.joinpath("grel_demo_model.joblib"))
    # with open(file=base_dir.joinpath("grel_demo_model.pkl"), mode="rb") as fp:
    #     grel_model = pickle.load(file=fp)

    nq_model = load(base_dir.joinpath("nq_demo_model.joblib"))
    # with open(file="nq_demo_model.pkl", mode="rb") as fp:
    #     nq_model = pickle.load(file=fp)

    return grel_model, nq_model


GREL_MODEL, NQ_MODEL = load_demo_models()


class RelevanceService(object):

    def __init__(self):
        pass

    @staticmethod
    def predict_relevance(features: Dict[int, Dict[str, float]], corpus="grel") -> Dict[int, Tuple[bool, float]]:
        """

        Args:
            features: features of paragraphs
            corpus: Determines whether the document comes from the g-REL or Google NQ corpus

        Returns:
            predicted relevance (probability, class) for each paragraph that has features.
        """
        pred_relevance = dict()
        if corpus == "grel":
            model = GREL_MODEL
        elif corpus == "nq":
            model = NQ_MODEL
        else:
            raise NotImplementedError("corpus must be 'grel' or 'nq'.")

        for par_id, par_features in features.items():

            model_input = pd.DataFrame.from_dict(data=par_features, orient="index").T.drop(columns="f_total_time")
            predicted_relevance = model.predict(model_input).flatten()[0]
            probability = model.predict_proba(model_input)[:, 1][0]

            pred_relevance[par_id] = (probability, predicted_relevance)

        return pred_relevance