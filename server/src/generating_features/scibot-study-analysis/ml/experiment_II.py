from ml.bhattacharya import bhattacharya_split
from ml.model_selection import ModelSelection, ModelSelectionConfig, ModelSelectionResult
from time import time
import pandas as pd
import numpy as np
import logging


logger = logging.getLogger(__name__)


def _model_selection(df, model, cv_type):
    # Setup Train and Test Data
    X = df.iloc[:, 10:]
    y = df["perceived_relevance"]
    groups = df["user"]

    if cv_type == "10x10":
        leave_groups_out = False
    elif cv_type == "lgo":
        leave_groups_out = True
    else:
        raise NotImplementedError(cv_type)

    if model == "svm":
        model_config = ModelSelectionConfig.default_svm
    elif model == "rf":
        model_config = ModelSelectionConfig.default_random_forest
    else:
        raise NotImplementedError(model)

    model_selector = ModelSelection(
        config=model_config(additional_scores=True, leave_groups_out=leave_groups_out),
        verbose=0, n_jobs=1
    )
    try:
        model_selector.fit(X, y, groups)
    except ValueError as e:
        logger.warning("error during model fitting: {}".format(e))
    return model_selector.result


def _run_experiment(df, model, cv_type):
    df_agree, df_topical, df_all = bhattacharya_split(df)
    t_start = time()
    _agree_res = _model_selection(df_agree, model, cv_type)
    logger.info(f"_agree.. took {time()-t_start}s")

    t_start = time()
    _topical_res = _model_selection(df_topical, model, cv_type)
    logger.info(f"_topical.. took {time()-t_start}s")

    t_start = time()
    _all_res = _model_selection(df_all, model, cv_type)
    logger.info(f"_all.. took {time() - t_start}s")

    res = {}

    def add_result(dataset, partial_res: ModelSelectionResult):
        if partial_res is None:
            return

        for k, v in partial_res.mean_additional_test_scores.items():
            if k not in res:
                res[k] = []
            res[k].append(v)

        for k in ["dataset", "n_cv", "n_test", "params"]:
            if k not in res:
                res[k] = []
        res["dataset"].append(dataset)
        res["params"].append([e.best_params_ for e in partial_res.estimators])
        res["n_cv"].append(np.mean(partial_res.n_cv_samples))
        res["n_test"].append(np.mean(partial_res.n_test_samples))

    add_result("_agree", _agree_res)
    add_result("_topical", _topical_res)
    add_result("_all", _all_res)

    return pd.DataFrame.from_dict(res)


def run_experiment_II(df_grel, df_nq, model, cv_type, min_visit_dur: int):
    logger.info("# Experiment II")

    logger.info("## g-rel")
    res_grel = _run_experiment(df_grel, model, cv_type)
    res_grel.insert(0, column="corpus", value="grel")

    logger.info("## nq")
    res_nq = _run_experiment(df_nq, model, cv_type)
    res_nq.insert(0, column="corpus", value="nq")

    res = pd.concat([res_grel, res_nq])
    res.insert(len(res.columns), column="model", value=model)
    res.insert(len(res.columns), column="cv_type", value=cv_type)
    res.insert(len(res.columns), column="min_visit_dur", value=min_visit_dur)
    return res

