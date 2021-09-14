from ml.bhattacharya import bhattacharya_split
from sklearn.ensemble import RandomForestClassifier
from imblearn.pipeline import make_pipeline
from ml.plot_learning_curve import plot_learning_curve
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import f1_score, make_scorer
from sklearn.svm import SVC
from sklearn.model_selection import cross_validate


def show_learning_curve(df):
    df_agree, df_topical, df_all = bhattacharya_split(df)

    corpus = df["corpus"].values[0]
    # get features, labels
    X = df_agree.iloc[:, 10:]
    y = df_agree["perceived_relevance"]

    #estimator = make_pipeline(RandomForestClassifier(n_estimators=100, min_samples_leaf=5, max_depth=10))
    estimator = make_pipeline(StandardScaler(), SMOTE(), SVC(kernel="rbf", C=1))

    plt = plot_learning_curve(estimator=estimator, title=f"Exp. I - Learning Curve - {corpus}", X=X, y=y,
                              cv=10, scoring="f1")
    plt.show()




