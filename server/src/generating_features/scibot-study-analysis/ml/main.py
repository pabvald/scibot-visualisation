from ml.experiment_I import run_experiment_I
from ml.experiment_II import run_experiment_II
from ml.experiment_III import simple_per_user_experiment
from ml.other import show_learning_curve
import pandas as pd
import logging
import csv
from time import time


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def save_result(df_res: pd.DataFrame, filename, log=True):
    df_res.to_csv(f"./results/{filename}", sep=";", quoting=csv.QUOTE_ALL)
    if log:
        logger.info("result: \n" + str(df_res.iloc[:, :7]))


if __name__ == '__main__':
    # -------------------------
    # --- EXPERIMENT CONFIG ---
    # -------------------------
    # data
    min_visit_duration = 10  # 3 (default), 5, 10
    # exp I
    exp_I = False
    exp_I_model = "rf"  # rf (default), svm
    exp_I_iter = 100  # default: 100
    # exp II
    exp_II = False
    exp_II_model = "svm"  # svm (default), rf
    exp_II_cv_type = "10x10"  # 10x10 (default), lgo

    # -----------------
    # --- LOAD DATA ---
    # -----------------
    if min_visit_duration == 3:
        nq_file = "generated/v04/nq_LongestVisitFeatureExtractor_20210625-1613_3s.csv"
        grel_file = "generated/v04/g-rel_LongestVisitFeatureExtractor_20210625-1612_3s.csv"
    elif min_visit_duration == 5:
        nq_file = "generated/v04/nq_LongestVisitFeatureExtractor_20210625-1615_5s.csv"
        grel_file = "generated/v04/g-rel_LongestVisitFeatureExtractor_20210625-1614_5s.csv"
    elif min_visit_duration == 10:
        nq_file = "generated/v04/nq_LongestVisitFeatureExtractor_20210625-1617_10s.csv"
        grel_file = "generated/v04/g-rel_LongestVisitFeatureExtractor_20210625-1616_10s.csv"
    else:
        raise NotImplementedError()
    df_nq = pd.read_csv(nq_file, sep=";")
    df_grel = pd.read_csv(grel_file, sep=";")

    # --------------------
    # --- EXPERIMENT I ---
    # --------------------
    if exp_I:
        t_start = time()
        result_exp_I = run_experiment_I(df_grel=df_grel, df_nq=df_nq, model=exp_I_model,
                                        n_iter=exp_I_iter, min_visit_dur=min_visit_duration)
        save_result(result_exp_I, f"exp01 m-{exp_I_model} i-{exp_I_iter} vd-{min_visit_duration}.csv")
        logger.info(f"processing took {time()-t_start}s")

    # ---------------------
    # --- EXPERIMENT II ---
    # ---------------------
    if exp_II:
        t_start = time()
        result_exp_II = run_experiment_II(df_grel=df_grel, df_nq=df_nq, model=exp_II_model,
                                          cv_type=exp_II_cv_type, min_visit_dur=min_visit_duration)
        save_result(result_exp_II, f"exp02 m-{exp_II_model} cv-{exp_II_cv_type} vd-{min_visit_duration}.csv")
        logger.info(f"processing took {time() - t_start}s")

    # ----------------------
    # --- EXPERIMENT III ---
    # ----------------------
    # logger.info("# Experiment III - per user training")
    # logger.info("## g-rel -> not enough data")
    # # simple_per_user_experiment(df_grel)
    # logger.info("## nq")
    # simple_per_user_experiment(df_nq)

    # -------------
    # --- OTHER ---
    # -------------
    show_learning_curve(df_grel)
    show_learning_curve(df_nq)
