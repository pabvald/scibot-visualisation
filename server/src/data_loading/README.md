# Data loading

## article_loader package 
The class `ScibotArticleLoader` can be used to load the articles. 

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the HTML files |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |


The class `ArticleParser` can be used to parse the HTML files into `Article` objects.

## gaze_loader package

The class `SciBotGazeDataLoader` can be used to load the complete SciBot dataset. It loads the data on initialization which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the gaze dataset |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |
| `include_users` | A list of users for which the data shall be loaded. If set to None, all but the excluded users are loaded. |
| `exclude_users` | A list of users for which no data shall be loaded. |

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


The `gaze_signal_dataframe` has the same format than the stored dataframe.

## features_loader package 

The class `ScibotParagraphFeaturesLoader` can be used to load the precomputed paragraph features. 
It loads the data on initialization, which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the paragraph features dataset |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |

After initialization, the data is offered via class properties (`grel_par_features`, 
`google_nq_par_features`). 

## layout_loader package 

The class `ScibotLayoutLoader` can be used to load the text coordinates. 
It loads the data on initialization, which takes the following parameters:

| param | description |
| ----- | ----------- |
| `data_dir` | The path to the document layouts |
| `googleNQ` | If True, data for Google NQ stimuli is loaded. Defaults to True. |
| `gREL` | If True, data for g-REL stimuli is loaded. Defaults to True. |

After initialization, the data is offered via class properties (`grel_labels`, 
`grel_paragraphs`, `google_nq_labels`, `google_nq_paragraphs`). 