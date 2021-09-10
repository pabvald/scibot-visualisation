# Data Cleaning and Pre-processing


In this section the act of cleanig and pre-processing the data will be explained.

The initial data-format looks like this:

    [time_stamp, gaze_x, gaze_y, fixation_x, fixation_y, scroll_y, label, event]

    - time_stamp: The timestamp for this "sample" 
    - gaze_x: The gaze-x coordinate given by Tobii
    - gazy_y: The gaze-y coordinate given by Tobii
    - fixation_x: The fixation-x coordinate given by Tobii
    - fixation_y: The fixation-y coordinate given by Tobii
    - scroll_y: The screens "y-position" for scrolling the page
    - label: The label which was hit by the gaze
    - event: Kivy-events like "Enter", "Hover" and "Leave" -> triggered when gaze meets a label

The folder-structure looks like this:

    <participant_id>
        -GoogleNQ
            -main
                -<condition_classifier>_Reading.csv
                -<condition_classifier>_Rating.csv
                -User_Rating
            -train
                -<condition_classifier>_Reading.csv
                -<condition_classifier>_Rating.csv
        -g-REL
            -main
                -<condition_classifier>_Reading.csv
                -<condition_classifier>_Rating.csv
                -User_Rating
            -train
                -<condition_classifier>_Reading.csv
                -<condition_classifier>_Rating.csv

The summary of data-cleaning and pre-processing:
     
    1) datawalker & pandas-converter
    2) sender.py
    3) replay-logging
    4) final output-structure
 
## Datawalker & Pandas-converter

### Pandas-converter

The pandas-converter takes the existing data-format and converts it to this format:

    [timestamp, gaze_x, gaze_y, fixation_x, fixation_y, scroll_y, enter, hover, leave]
    
   
In this format there is no label but the event-values (enter, hover, leave) will be set as the "Label" if a label 
triggers the event and "None" if not.

In the original format, it was possible that there were 2 entries with the same timestamp, when the gaze went directly
from one label to another.

Therefore the event "leave" and "enter" occured in the same time-interval.
The new data-format eliminates 2 consecutive entries with the same timestamp, as "leave" and "enter" can exist in one
single entry.

## Datawalker

The datawalker is specified to go over the existing folder-structure and converts every single file to the new format 
with the pandas-converter. The output-folder will look exactly like the initial structure but it will have the new 
data-format.
