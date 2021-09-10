# Loading the SciBot Dataset

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

## visit_extractor package

The `visit_extractor` offers a function to extract visits to paragraphs, i.e., consecutive sequences of gazes to one paragraph. Short gaps and short visits are ignored (in this order). The function is `extract_paragraph_visits_vectorized` and takes the following parameters:

| parameter | description |
| --------- | ----------- |
| `df` | Gaze data from a single trial (user and document) |
| `min_visit_duration` | Minimum duration of a visit [s]; must be greater than max_gap_duration. |
| `max_gap_duration` | Maximum duration of gaps that shall be ignored [s]. |
| `ignore_background` | If True, no background visits are returned. Defaults to True. |

The function returns a list of `ParagraphVisit` instances that reflect all paragraph visits in the given `df`.
Each instance includes the following information:

| var | description |
| --- | ----------- |
| `visit_id` | A unique id. Increases across paragraphs and for background visits. |
| `start_time` | Timestamp of the first gaze sample of the visit [s]. |
| `end_time` | Timestamp of the last gaze sample of the visit [s]. |
| `duration` | Duration [s] |
| `paragraph_id` | The id of the visited paragraph. |
| `is_background_visit` | True, if the paragraph id is smaller than 0, i.e., if the gaze was pointing to the background or, for GoogleNQ only, to a headline. |
| `data` | A view on the dataframe for the respective visit. |

### Example
The output `visits` can easily be used to retrieve visits to a single paragraph with `pid=5` like this:

```python
from data_loading.visit_extractor import extract_paragraph_visits_vectorized

df = None  # to be replaced 
pid = 5
visits = extract_paragraph_visits_vectorized(df)
paragraph_visits = [v for v in visits if v.paragraph_id == pid]
```


### Backup // docs for old visit extraction

'extract_paragraph_visits(<pandas.Datafame>, min_visit_length, max_visit_gap)' from visit_extractor.py is used to split the dataframe into segments of paragraph-specific data.
It will iterate over the dataframe and if the gaze_data hits a paragraph consecutively for at least  <min_visit_length> seconds,
then it will extract the data of this segment and add it to a dictionary (see below: 'return values').
If it hits a paragraph again in less than <max_visit_gap> seconds, it will merge both visits into one.

For every segment it will also calculate some addtional information.

Additional information of the segment are:
    
    hit_id: running (unique) id, which indicates in which order the segments were hit
    duration: duration of the segment
    start_time: the time the segment started
    end_time: the time the segment ended
    paragraph_id: the id of the paragraph. Can be 'None' or for example '2' (an number as a string)
    num_gaze_samples: number of gazes samples 

Return values:
    
    {
      paragraph_id:
        [  
           [  
             {
              'hit_id': (int) x,
              'duration': (float) t
              'start_time': (float) s
              'end_time': (float) e
              'paragraph_id': (string) y # will be a number as string or 'None'
              'num_gaze_samples': (int) count of gaze samples in this visit
             },
              segment of paragraph_visit (segment as pandas dataframe)
           ],
           [
             ...
           ]
        ]
      paragraph_id_2:
        [
          ...
        ]
    }
    

Example usage:
    
    import pandas as pd
    from data_loading.visit_extractor.py import extract_paragraph_visits
    dataframe = pd.read(<file_with_data>, delimiter="|", encoding='utf-8', float_precision='round_trip')
    paragraph_dict = extract_paragraph_visits(dataframe, min_visit_length = <float>, max_visit_gap = <float>)

