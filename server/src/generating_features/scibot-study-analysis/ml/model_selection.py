from sklearn.model_selection import GridSearchCV, StratifiedKFold, GroupKFold, LeaveOneGroupOut
from sklearn.metrics import f1_score, accuracy_score, balanced_accuracy_score, precision_score, recall_score, \
    confusion_matrix, roc_auc_score
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
# from sklearn.pipeline import Pipeline
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import RobustScaler, StandardScaler
import numpy as np


class ModelSelectionConfig:

    def __init__(self, estimator, key, param_grid, scaler=None, resampler=None, k_outer=10, leave_groups_out=False,
                 k_inner=10, scoring="f1", additional_scores=False, n_iterations=1):
        self._key = key
        self._estimator = estimator
        self._param_grid = param_grid
        self._scaler = scaler
        self._resampler = resampler

        self._k_outer = k_outer
        self._k_inner = k_inner
        self._scoring = scoring
        self._additional_scorng = additional_scores
        self._n_iter = n_iterations
        self._leave_groups_out = leave_groups_out

        if n_iterations != 1:
            raise NotImplementedError("use default for n_iterations")

    @property
    def pipeline(self) -> Pipeline:
        steps = []
        if self._scaler is not None:
            steps.append(("scaler", self._scaler))
        if self._resampler is not None:
            steps.append(("resampler", self._resampler))
        steps.append((self._key, self._estimator))
        return Pipeline(steps=steps)

    @property
    def param_grid(self):
        return self._param_grid

    @property
    def leave_groups_out(self):
        return self._leave_groups_out

    @property
    def k_outer(self):
        return self._k_outer

    @property
    def k_inner(self):
        return self._k_inner

    @property
    def scoring(self):
        return self._scoring

    @property
    def additional_scoring(self):
        return self._additional_scorng

    @property
    def n_iter(self):
        return self._n_iter

    @staticmethod
    def default_random_forest(**kwargs):
        return ModelSelectionConfig(key="rf", estimator=RandomForestClassifier(),
                                    param_grid=[{'rf__n_estimators': [50, 100],
                                                 'rf__max_depth': [5, None],
                                                 'rf__min_samples_leaf': [1, 3]}],
                                    **kwargs)

    @staticmethod
    def default_svm(**kwargs):
        return ModelSelectionConfig(key="svm", estimator=SVC(kernel="rbf", probability=True),
                                    scaler=StandardScaler(), resampler=SMOTE(),
                                    param_grid=[{'svm__C': [.01, .1, .5, 1, 5]}], **kwargs)

    # # Model and Parameter Definition
    # models = {
    #     "svm": (
    #     SVC, [{'svm__C': [.1, 1, 10, 100, 1000], 'svm__gamma': [1, .1, .01, .001, .0001], 'svm__kernel': ['rbf']}]),
    #     "gbt": (GradientBoostingClassifier,
    #             [{'gbt__n_estimators': [10, 50, 100, 500], 'gbt__max_depth': [2, 3, 4],
    #               'gbt__learning_rate': [.1, .01]}]),
    #     "rf": (RandomForestClassifier, [{'rf__n_estimators': [50, 100]}]),
    #     "dt": (DecisionTreeClassifier, [])
    # }


class ModelSelectionResult:

    def __init__(self):
        self.test_score = []
        self.valid_score = []
        self.train_score = []
        self.additional_test_scores = {}

        self.estimators = []

        self.n_cv_samples = []
        self.n_test_samples = []

    @property
    def mean_test_score(self):
        return np.mean(self.test_score)

    @property
    def mean_valid_score(self):
        return np.mean(self.valid_score)

    @property
    def mean_train_score(self):
        return np.mean(self.train_score)

    @property
    def mean_additional_test_scores(self):
        mean_scores = {k: np.mean(v) for k, v in self.additional_test_scores.items() if k != confusion_matrix.__name__}
        mean_cnf_matrix = np.mean([m.flatten() for m in self.additional_test_scores[confusion_matrix.__name__]], axis=0)
        mean_scores[confusion_matrix.__name__] = mean_cnf_matrix
        mean_cnf_matrix = mean_cnf_matrix.reshape((2, 2))
        mean_scores["tn"] = mean_cnf_matrix[0, 0]
        mean_scores["fn"] = mean_cnf_matrix[1, 0]
        mean_scores["tp"] = mean_cnf_matrix[1, 1]
        mean_scores["fp"] = mean_cnf_matrix[0, 1]
        return mean_scores

    def add_score(self, test: float, valid: float, train: float):
        self.test_score.append(test)
        self.valid_score.append(valid)
        self.train_score.append(train)

    def add_estimator(self, estimator):
        self.estimators.append(estimator)

    def _add_additional_score(self, scorer, score):
        if scorer.__name__ not in self.additional_test_scores:
            self.additional_test_scores[scorer.__name__] = []
        self.additional_test_scores[scorer.__name__].append(score)

    def add_additional_scores(self, clf, X, y):
        y_pred = clf.predict(X)
        for scorer in [accuracy_score, precision_score, recall_score,
                       balanced_accuracy_score, f1_score, confusion_matrix]:
            self._add_additional_score(scorer, scorer(y_true=y, y_pred=y_pred))

        y_proba = clf.predict_proba(X)[:, 1]
        self._add_additional_score(roc_auc_score, roc_auc_score(y_true=y, y_score=y_proba))

    def add_num_samples(self, n_cv, n_test):
        self.n_cv_samples.append(n_cv)
        self.n_test_samples.append(n_test)


class ModelSelection:

    def __init__(self, config: ModelSelectionConfig, n_jobs=-1, verbose=0):
        self.config = config
        self.n_jobs = n_jobs
        self.verbose = verbose
        self.result = None

    def fit(self, X, y, groups):
        result = ModelSelectionResult()  # TODO: collect multiple instances (one per iteration)
        for i in range(self.config.n_iter):
            if self.config.leave_groups_out > 0:
                cv_outer = GroupKFold(n_splits=self.config.k_outer)
            else:
                cv_outer = StratifiedKFold(n_splits=self.config.k_outer, shuffle=True, random_state=i)
            cv_inner = StratifiedKFold(n_splits=self.config.k_inner, shuffle=True, random_state=i)
            for train_idx, test_idx in cv_outer.split(X=X, y=y, groups=groups):
                # HYPER-PARAMETER OPTIMIZATION
                X_train = X.iloc[train_idx]
                y_train = y.iloc[train_idx]
                n_cv = len(y_train)
                clf = GridSearchCV(estimator=self.config.pipeline, param_grid=self.config.param_grid,
                                   cv=cv_inner, scoring=self.config.scoring, refit=True, n_jobs=self.n_jobs,
                                   return_train_score=True, verbose=self.verbose)
                clf.fit(X=X_train, y=y_train)

                # SCORING
                X_test = X.iloc[test_idx]
                y_test = y.iloc[test_idx]
                n_test = len(y_test)
                result.add_score(
                    test=clf.score(X_test, y_test),
                    valid=clf.best_score_,
                    train=clf.cv_results_["mean_train_score"][clf.best_index_]
                )
                result.add_estimator(clf)
                result.add_num_samples(n_cv, n_test)
                if self.config.additional_scoring:
                    result.add_additional_scores(clf, X_test, y_test)

        self.result = result
