# Machine Learning Experiments

Our goal is to model the relevance of a read text with respect to a previously shown trigger question using machine learning. This package includes scripts and helper functions for generating training data for machine learning.

## Generating Training Data from Study Recordings

The script `generate_training_data.py` can be used to generate training data from recordings of a study. Define the following fields in the `main` routine before running the script:

| Variable | Description |
| -------- | ----------- |
| `min_visit_duration` | The minimum duration of a visit |
| `data_dir` | The root folder of the recording from the user study. The zipped datasets can be found in the _Team_SciBot_ files: `"General/SciBot Dataset/*"` |
| `target_dir` | The folder in which the extracted features are stored. |
| `feature_func` | The method for selecting _visits_ / computing feautres per paragraph. Methods: `features_visit_based_mean` computes features for all visits and returns the mean feature values. `features_first_visit` and `features_last_visit` compute features for the first or last visit only. `features_longest_visit` computes features for the longest visit per paragraph. `features_all_visits` computes features per visit and returns all as separate data sample. The default is `features_longest_visit`. |
| `screen_width, screen_height` | [deprecated] Defines the width and height of the screen than was used in the user study for recording the gaze data. For the SciBot study, we used a display with a resolution of 2560 x 1440 pixels. |

Per run, the script generates two _csv_ files in the _generated_ subfolder, one for **g-REL** and one for **GoogleNQ**. The file names indicate the corpus (g-rel, nq), the `feature_func` used for extracting the training data, and the data of creation. The _csv_ files include the following columns:

| column    | description |
| --------- | ----------- |
| index     | Running number of the samples (can be ignored). |
| user      | The participant id. |
| document  | The document id (stimulus and trigger question). |
| paragraph | The paragraph id. | 
| visit     | The running number of the participant's visit to a paragraph. Is empty for all methods but `features_all_visits`. |
| system_relevance | The relevance as defined by the corpus. **Alternative prediction target for model training.** |
| perceived_relevance | The relevance as perceived by the user / participant. **Prediction target for model training.** |
| system_relevance_type | The system relevance in g-REL-like encoding: *r* is relevant, *t* is topical, and *i* is irrelevant. |
| method | Indicates the method used for extracting this sample. See `feature_func` above. |
| f_\<feature\> | One column per feature. See `features` package. These columns form the feature vector that is used as **input for model training**. |


## Pre-Processing and Model Training 
This section refers to `ml/main.py`.

* Set filenames (`nq_file` and `grel_file`). The files can be generated using `generate_training_data.py` as described above.
* Set `min_visit_duration`
* Run `ml/main.py`: It will execute all experiments as described below.

### EXPERIMENT I 
Confirm findings from Bhattacharya et al.

* use **g-REL** data only
* split data in *_agree* (perceived and system relevance coincide, no topical articles), *_topical* (only topical articles), *_all*
* stratified random split into a train and a test set (80/20)
* used *established*, *proposed*, and *combined* gaze-based features to predict the perceived relevance
* used 10-fold CV for parameter optimization (train set): Random Forest with 100 estimators (remainind parameters are set to their default), no feature normalizaiton. 
* report *balanced accuracy*, *ROC AUC*, *F1* scores for multiple points in time.
* repeated for multiple points in time based on normalized time in task and actual/linear time in task.

They report results for two studies (D1, D2). We will compare our results to their results reported for the combined dataset *D1_D2*, the last point in time (normalized), and the best feature combinations (based on F1 score):

**Limitations.** They included data from all users in model training: They did not investigate the difference of user-specific vs. cross-user training. 

#### Results from Bhattacharya et al. 2020 (g-REL data)
| Dataset    | Feature-Set | Balanced Accuracy | ROC AUC | F1   |
| ---------- | ----------- | ----------------- | ------- | ---- |
| *_agree*   | combined    | 0.84              | 0.92    | 0.82 |
| *_topical* | combined    | 0.59              | 0.77    | 0.30 |
| *_all*     | combined    | 0.73              | 0.85    | 0.65 | 

> The following experiments replicate the study from Bhattacharya et al.
> The results are generated using the `LongestVisitFeatureExtractor` method (which turned out to perform best).
> We train 100 times and report the average scores (more stable).

> These results are based on the current fixation detection algorithm which may heavily influence the results. 

#### Results from our study using the same ML approach (g-REL data)
| Dataset    | Feature-Set | Balanced Accuracy | ROC AUC | F1    |
| ---------- | ----------- | ----------------- | ------- | ----- |
| *_agree*   | combined    | 0.656             | 0.726   | 0.632 |
| *_topical* | combined    | 0.526             | 0.549   | 0.138 |
| *_all*     | combined    | 0.594             | 0.639   | 0.433 |
_updated on 28 June 2021_

#### Results from our study using the same ML approach (nq data)
(irrelevant vs. relevant only)

| Dataset    | Feature-Set | Balanced Accuracy | ROC AUC | F1    |
| ---------- | ----------- | ----------------- | ------- | ----- |
| *_agree*   | combined    | 0.514             | 0.563   | 0.093 |
| *_topical* | combined    | --                | --      | --    |
| *_all*     | combined    | 0.524             | 0.59    | 0.221 |
_updated on 28 June 2021_

### Advanced Training Methods

* Classes are unbalanced -> use SMOTE for dataset balancing
* Use data normalization
* Use nested cross-validation
* Leave users out in cross-validation
* Use Gradient Boosted Trees


### Apply Training Methods to Multi-Paragraph Data 

* Do findings generalize?
