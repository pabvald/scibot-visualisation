from sklearn.model_selection import LeaveOneOut
from imblearn.pipeline import make_pipeline
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
import pandas as pd


def per_user_training(X, y):
    tp = 0
    fp = 0
    tn = 0
    fn = 0

    for train_idx, test_idx in LeaveOneOut().split(X, y):
        X_train = X.iloc[train_idx]
        y_train = y.iloc[train_idx]

        clf = make_pipeline(SMOTE(k_neighbors=5), StandardScaler(), SVC(kernel="rbf", C=1, probability=True))
        clf.fit(X_train, y_train)

        y_true = y.iloc[test_idx].values[0]
        y_pred = clf.predict(X.iloc[test_idx])[0]
        if y_true and y_pred:
            tp += 1
        elif y_true and not y_pred:
            fn += 1
        elif not y_true and not y_pred:
            tn += 1
        elif not y_true and y_pred:
            fp += 1

    # cnf_matrix = np.zeros(shape=(2, 2), dtype=np.float32)
    # cnf_matrix[0, 0] = tn
    # cnf_matrix[1, 0] = fn
    # cnf_matrix[1, 1] = tp
    # cnf_matrix[0, 1] = fp

    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    f1 = 2 * (precision * recall) / (precision + recall)
    specificity = tn / (tn + fp)
    balanced_accuracy = (recall + specificity) / 2
    accuracy = (tp + tn) / (tp + tn + fp + fn)

    return {
        "tp": tp, "fp": fp, "fn": fn, "tn": tn,
        "tpr": recall, "fpr": fp / (fp + tn), "precision": precision, "f1": f1, "tnr": specificity,
        "balanced_accuracy": balanced_accuracy, "accuracy": accuracy
    }


def simple_per_user_experiment(df):

    results = {"user": []}
    users = df["user"].unique()
    for user in users:
        df_user = df[df["user"] == user]
        X = df_user.iloc[:, 10:]
        y = df_user["perceived_relevance"]

        r = per_user_training(X, y)

        results["user"].append(user)
        for k, v in r.items():
            if k not in results:
                results[k] = []
            results[k].append(v)

    results = pd.DataFrame.from_dict(results)
    return results