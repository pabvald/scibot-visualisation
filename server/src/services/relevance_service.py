import random

from typing import List, Dict, Tuple


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