# Data loading

## article_parser package 
The class `ArticleParser` can be used to parse the HTML files into `Article` objects.

## data_loader package

The class `SciBot_DataLoader` can be used to load the complete SciBot dataset. It loads the data on initialization which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the SciBot dataset |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |
| `gaze_data` | If True, the gaze signal is loaded. Otherwise, the ratings are loaded only. Defaults to True. |
| `training_data` | If set to True, the data from the training phase is loaded instead of data from the main experiment. Defaults to False. |
| `include_users` | A list of users for which the data shall be loaded. If set to None, all but the excluded users are loaded. |
| `exclude_users` | A list of users for which no data shall be loaded. |
| `reading_task`| Data from the reading tasks are loaded. |
| `rating_task` | Data from the rating tasks are loaded. |

After initialization, the data is offered via class properties (`google_nq_reading`, `google_nq_rating`, `grel_reading`, `grel_rating`). The properties hold data from the `*_reading` / `*_rating` task for `google_nq_*` / `grel_*` stimuli.

**Data Format**

```python
{
    # for each participant 
    "A01": {
        # for each stimulus (QA pair)
        "g-rel_q116-1": {
            "index": 0,  # indicates the order of presentation during the study, differs for each participant
            "doc": 'q116-1',  # unique name of the stimulus
            "corpus": "g-rel",  # the corpus of origin
            "file": "0_g-rel_q116-1_r.html_Reading.csv",  # the recording file
            "perceived_relevance": [True],  # List of user's relevance ratings, one rating per paragraph
            "system_relevance": [True],  # List of ground-truth relevance ratings, one rating per paragraph
            "g-rel_relevance": 'r'  # [g-REL only] the original relevance rating. One of r(elevant), t(opical), i(rrelevant).
            "num_paragraphs": 7,  # [Google NQ only] the number of paragraphs in the document (without headline)
            "answer_paragraph_id": 1,  # [Google NQ only] ID of the paragraph that contains the answer.
            "dataframe": gaze_signal_dataframe,  # the eye tracking data for the document and user
        }
    }
}
```


The `gaze_signal_dataframe` hat the same format than the stored dataframe with a few exceptions:
* `None` values are replaced with `np.nan` for all columns
* For g-REL data, we re-assign paragraph IDs based on the joint paragraph areas. IDs are `0`, if the gaze/fixation lies within the document area and `-2` otherwise; If there is no fixation, IDs are `np.nan`.
* *gaze_y* and *fixation_y* are mirrored (workaround). **TODO:** remove mirroring after the issue is fixed.


## features_loader package 

The class `ScibotParagraphFeaturesLoader` can be used to load the precomputed paragraph features. 
It loads the data on initialization, which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the SciBot dataset |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |

After initialization, the data is offered via class properties (`grel_par_features`, 
`google_nq_par_features`). 

## mapping_loader package 

The class `ScibotMappingLoader` can be used to load the text coordinates. 
It loads the data on initialization, which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the SciBot dataset |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |

After initialization, the data is offered via class properties (`grel_labels`, 
`grel_paragraphs`, `google_nq_labels`, `google_nq_paragraphs`). 