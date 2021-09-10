import pandas as pd
import logging
from ml.bhattacharya import bhattacharya_split, train_and_test


logger = logging.getLogger(__name__)


def run_experiment_I(df_grel, df_nq, model: str, n_iter: int, min_visit_dur: int):
    logger.info("# Experiment I")
    logger.info(f"80/20 split | combined features | longest visit @ {min_visit_dur}s "
                f"| n_iter={n_iter} | model={model}")

    logger.info("## g-rel")
    res_grel = run_validation_experiment(df_grel, model=model, num_iterations=n_iter)
    res_grel.insert(loc=0, column="corpus", value="grel")

    logger.info("## nq")
    res_nq = run_validation_experiment(df_nq, model=model, num_iterations=n_iter)
    res_nq.insert(loc=0, column="corpus", value="nq")

    res = pd.concat([res_grel, res_nq])
    res.insert(len(res_nq.columns), column="min_visit_dur", value=min_visit_dur)

    return res


def run_validation_experiment(df, num_iterations=100, model="rf"):
    df_agree, df_topical, df_all = bhattacharya_split(df)

    _agree_res = {}
    _topical_res = {}
    _all_res = {}

    def _append_res(d, res):
        if res is None:
            return
        for k, v in res.items():
            if k not in d:
                d[k] = []
            d[k].append(v)

    for i in range(num_iterations):
        random_state = i
        _append_res(_agree_res, train_and_test(df_agree, random_state=random_state, model=model))
        _append_res(_topical_res, train_and_test(df_topical, random_state=random_state, model=model))
        _append_res(_all_res, train_and_test(df_all, random_state=random_state, model=model))

    _agree_res = pd.DataFrame.from_dict(_agree_res).mean()
    _agree_res["dataset"] = "_agree"
    _topical_res = pd.DataFrame.from_dict(_topical_res).mean()
    _topical_res["dataset"] = "_topical"
    _all_res = pd.DataFrame.from_dict(_all_res).mean()
    _all_res["dataset"] = "_all"

    res = pd.concat([_agree_res, _topical_res, _all_res], axis=1).T
    res.insert(loc=len(res.columns), column="model", value=model)
    res.insert(loc=len(res.columns), column="n_iter", value=num_iterations)

    return res
