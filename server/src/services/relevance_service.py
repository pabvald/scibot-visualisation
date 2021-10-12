import random
import pickle
from joblib import load
import pathlib

from typing import List, Dict, Tuple


def load_demo_models():
    base_dir = pathlib.Path(__file__).parent.resolve()

    grel_model = load(base_dir.joinpath("grel_demo_model.pkl"))
    # with open(file=base_dir.joinpath("grel_demo_model.pkl"), mode="rb") as fp:
    #     grel_model = pickle.load(file=fp)

    nq_model = load(base_dir.joinpath("nq_demo_model.pkl"))
    # with open(file="nq_demo_model.pkl", mode="rb") as fp:
    #     nq_model = pickle.load(file=fp)

    return grel_model, nq_model


GREL_MODEL, NQ_MODEL = load_demo_models()


class RelevanceService(object):

    def __init__(self):
        pass

    @staticmethod
    def predict_relevance(features: Dict[int, Dict[str, float]]) -> Dict[int, Tuple[bool, float]]:
        """

        Args:
            features: features of paragraphs

        Returns:
            predicted relevance (probability, class) for each paragraph that has features.
        """
        pred_relevance = dict()

        for par_id, par_features in features.items():
            prob = random.uniform(0, 1)
            relevance = True if prob > 0.5 else False

            #relevance, prob = michaels_model(par_features)

            pred_relevance[par_id] = (prob, relevance)

        return pred_relevance