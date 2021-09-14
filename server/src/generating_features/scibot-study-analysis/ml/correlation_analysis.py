import pandas as pd
from plotly.subplots import make_subplots
import plotly.graph_objects as go


if __name__ == '__main__':
    # load training data
    nq_file = "generated/v04/nq_LongestVisitFeatureExtractor_20210625-1613_3s.csv"
    grel_file = "generated/v04/g-rel_LongestVisitFeatureExtractor_20210625-1612_3s.csv"
    df_nq = pd.read_csv(nq_file, sep=";")
    df_grel = pd.read_csv(grel_file, sep=";")

    # select feature and target rows
    features = [c for c in df_nq.columns if c.startswith("f_") and not c == "f_total_time"]
    target = ["system_relevance", "perceived_relevance", "system_relevance_type"]  # system_relevance, perceived_relevance, system_relevance_type
    df_nq = df_nq[target + features]
    df_grel = df_grel[target + features]

    # set True/r to 1; False/i to 0; t to .5
    df_nq.replace(to_replace=True, value=1, inplace=True)
    df_nq.replace(to_replace=False, value=0, inplace=True)
    df_nq.replace(to_replace="i", value=0, inplace=True)
    df_nq.replace(to_replace="t", value=.5, inplace=True)
    df_nq.replace(to_replace="r", value=1, inplace=True)
    df_grel.replace(to_replace=True, value=1, inplace=True)
    df_grel.replace(to_replace=False, value=0, inplace=True)
    df_grel.replace(to_replace="i", value=0, inplace=True)
    df_grel.replace(to_replace="t", value=.5, inplace=True)
    df_grel.replace(to_replace="r", value=1, inplace=True)

    # compute correlation matrices
    nq_corr_matrix = df_nq.corr()
    nq_target_corr = nq_corr_matrix.iloc[:3, 3:]
    grel_corr_matrix = df_grel.corr()
    grel_target_corr = grel_corr_matrix.iloc[:3, 3:]

    # plot correlation matrices
    fig = make_subplots(
        rows=2,
        cols=1,
        shared_xaxes=False,
        start_cell="bottom-left",
        row_titles=["grel", "nq"]
    )
    fig.add_trace(
        go.Heatmap(name="grel", z=grel_target_corr, x=grel_target_corr.columns, y=grel_target_corr.index,
                   colorscale="viridis"),
        row=1, col=1
    )
    fig.add_trace(
        go.Heatmap(name="nq", z=nq_target_corr, x=nq_target_corr.columns, y=nq_target_corr.index,
                   colorscale="viridis"),
        row=2, col=1
    )
    fig.data[0].update(zmin=-.3, zmax=.3)
    fig.data[1].update(zmin=-.3, zmax=.3)

    fig.show()

    pass