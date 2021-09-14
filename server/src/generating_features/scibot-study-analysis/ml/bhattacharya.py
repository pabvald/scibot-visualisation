from sklearn.model_selection import train_test_split
from sklearn.metrics import balanced_accuracy_score, f1_score, roc_auc_score, precision_score, recall_score, \
    accuracy_score, confusion_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from imblearn.pipeline import make_pipeline
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler


def filter_by_agreement(df):
    return df.loc[df["system_relevance"] == df["perceived_relevance"]]


def split_topical(df):
    df_topical = df.loc[df["system_relevance_type"] == "t"]
    df_other = df.loc[df["system_relevance_type"] != "t"]
    return df_topical, df_other


def bhattacharya_split(df):
    df_topical, df_other = split_topical(df)
    df_agree = filter_by_agreement(df_other)

    return df_agree, df_topical, df


def train_and_test(df, test_size=.2, random_state=0, model="rf"):
    if df.size == 0:
        return None
    df_train, df_test = train_test_split(df, test_size=test_size, random_state=random_state,
                                         shuffle=True, stratify=df["perceived_relevance"])

    # get features, labels
    X_train = df_train.iloc[:, 10:]
    y_train = df_train["perceived_relevance"]
    n_cv = len(y_train)

    if model == "rf":  # default (see Bhattacharya et al. '20)
        clf = RandomForestClassifier(n_estimators=100)
    else:
        clf = make_pipeline(SMOTE(), StandardScaler(), SVC(kernel="rbf", C=1, probability=True))
    clf.fit(X_train, y_train)

    X_test = df_test.iloc[:, 10:]
    y_test = df_test["perceived_relevance"]
    n_test = len(y_test)

    y_pred = clf.predict(X_test)
    y_proba = clf.predict_proba(X_test)[:, 1]

    cnf_matrix = confusion_matrix(y_true=y_test, y_pred=y_pred)
    scores = {
        "accuracy": accuracy_score(y_true=y_test, y_pred=y_pred),
        "balanced_accuracy": balanced_accuracy_score(y_true=y_test, y_pred=y_pred),
        "roc_auc": roc_auc_score(y_true=y_test, y_score=y_proba),
        "f1": f1_score(y_true=y_test, y_pred=y_pred),
        "precision": precision_score(y_true=y_test, y_pred=y_pred, zero_division=0.),
        "recall": recall_score(y_true=y_test, y_pred=y_pred),
        "tn": cnf_matrix[0, 0],
        "fn": cnf_matrix[1, 0],
        "tp": cnf_matrix[1, 1],
        "fp": cnf_matrix[0, 1],
        "n_cv": n_cv,
        "n_test": n_test
    }

    return scores
