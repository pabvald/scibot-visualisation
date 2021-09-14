## Sender.py

The Sender.py is used to imitate gaze-data with the existing data we extracted through the study and sends it to the 
Replay-manager (will be seen soon).

But before it sends it to the Replay-manager, the Sender.py will calculate fixations, which will also be sent.
The fixation detection is from the gaze_event_detection package. 
The sender will take the data from data_conversion pakacge and simulates the gaze_x, gaze_y, fixation_x and fixation_y
according to the timestamp from the file.


## Replay-logging

The Replay-tool is capable of visualizing the received data (with fixations) and will log it with more data than the
original.

The gaze-point will be shown as a transparent circle and the fixations will be shown as red circles which will be bigger
the longer the fixation lasts. Saccades will be displayed as red lines between the fixations.

The logger of the Replay-tool will not also directly log the pandas-converter-format but it will also add more variables
like:

    - parapraph_id: The id of the paragraph where the gaze hits
    - fix_paragraph_id: paragraph_id where the fixation hits
    
Labels will also be saved as a tuple with their corresponding paragraph:
    
    (paragraph, label) for example: (4, 'beach') 
    

The output-structure of the Replay-tool will look like the original folder-structure only without rating.csv


