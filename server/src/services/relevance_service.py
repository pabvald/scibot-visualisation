import random
import pickle
import pathlib
import pandas as pd

from joblib import load
from models import Corpus
from typing import List, Dict, Tuple


def load_demo_models():
    base_dir = pathlib.Path(__file__).parent.resolve()

    grel_model = load(base_dir.joinpath("ml_models/grel_demo_model.joblib"))
    # with open(file=base_dir.joinpath("grel_demo_model.pkl"), mode="rb") as fp:
    #     grel_model = pickle.load(file=fp)

    nq_model = load(base_dir.joinpath("ml_models/nq_demo_model.joblib"))
    # with open(file="nq_demo_model.pkl", mode="rb") as fp:
    #     nq_model = pickle.load(file=fp)

    return grel_model, nq_model


GREL_MODEL, NQ_MODEL = load_demo_models()


class RelevanceService(object):

    def __init__(self):
        pass

    @staticmethod
    def predict_relevance(features: Dict[int, Dict[str, float]], corpus: Corpus) -> Dict[int, Tuple[bool, float]]:
        """

        Args:
            features: features of paragraphs
            corpus: determines whether the document comes from the g-REL or Google NQ corpus

        Returns:
            predicted relevance (probability, class) for each paragraph that has features.
        """
        pred_relevance = dict()
        if corpus == Corpus.grel:
            model = GREL_MODEL
        elif corpus == Corpus.nq:
            model = NQ_MODEL
        else:
            raise NotImplementedError("corpus must be 'grel' or 'nq'.")

        for par_id, par_features in features.items():
            model_input = pd.DataFrame.from_dict(data=par_features, orient="index").T.drop(columns="f_total_time")
            predicted_relevance = model.predict(model_input).flatten()[0]
            probability = model.predict_proba(model_input)[:, 1][0]

            pred_relevance[par_id] = (probability, predicted_relevance)

        return pred_relevance
