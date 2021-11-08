# SciBot Dataset
[Download](https://dfkide.sharepoint.com/:f:/s/Team_SciBot9/EmnBewBVgEtHgOvy_y4GVzYBhsqC8myswZ2j2Il5MiFw-g?e=jaidBR) the most recent version of the SciBot dataset from our OneDrive. 

##  Folder structure

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

## Dataframe structure
      ['timestamp', 'gaze_x', 'gaze_y', 'fixation_x', 'fixation_y', 'fixation_id', 'scroll_y', 'paragraph_id', 'fix_paragraph_id',
              'enter', 'enter', 'leave']
| field | description |
| ------- | :---------- | 
| `timestamp` | Timestamp for each gaze sample `[s]` |
| `gaze_x` | Horizontal gaze position `[0.0 - 2560.0]` (Top left `[x = 0.0, y = 1440]` Bottom Right `[x = 2560.0, y = 0]`) |
| `gaze_y` | Vertical gaze position `[0.0 - 1440.0]` (Top left `[x = 0.0, y = 1440]` Bottom Right `[x = 2560.0, y = 0]`)|
| `fixation_x` | Horizontal fixation position `[0.0 - 2560.0]` or `[None]` if there is no fixation (Top left `[x = 0.0, y = 1440]` Bottom Right `[x = 2560.0, y = 0]`)| 
| `fixation_y` | Vertical fixation position `[0.0 - 1440.0]` or `[None]` if there is no fixation (Top left `[x = 0.0, y = 1440]` Bottom Right `[x = 2560.0, y = 0]`)|
| `fixation_id` | ID of the current fixation `[0 - X]` (where X is the number of fixations)  or `[None]` if there is no fixation|
| `scroll_y` | Relative scrolling position `[1.0 - 0.0]` Top: `[1.0]` Bottom: `[0.0]` |
| `paragraph_id` | ID of the paragraph that is hit by the gaze signal `[-2 to 6]` with `-1` referring to the headline area and `-2` referring to the remaining free space and `-3` refering to the rating button|
| `fix_paragraph_id` | ID of the paragraph that is hit by the current fixation `[-2 to 6]` with `-1` referring to the headline area and `-2` referring to the remaining free space and `-3` refering to the rating button. Is `None`, if not fixation was detected. |
| `enter` | Event when gaze entered the bounding box of a label (label_id, label_text)  `[(0-X,"string")]` or `[None]` if there the gaze sample did not enter a label Hitbox|
| `hover` | Event when gaze hovers the bounding box of a label (label_id, label_text)  `[(0-X,"string")]`  or `[None]` if there the gaze sample did not hover a label Hitbox|
| `leave` | Event when gaze exits the bounding box of a label (label_id, label_text)  `[(0-X,"string")]`  or `[None]` if there the gaze sample did not hover a label Hitbox |
| `abs_y` | Absoulte vertical gaze position in the document. (Top left `[x = 0.0, y = max_y]` Bottom Right `[x = 2560.0, y = 0]`) |
| `stimulus_gaze_x` | If paragrah is hit: horizontal gaze position relative in the paragraph box (Top left `[x = 0.0, y = paragraph.y]` Bottom Right `[x = paragraph.x, y = 0]`) |
| `stimulus_gaze_y` |If paragrah is hit: vertical gaze position relative in the paragraph box (Top left `[x = 0.0, y = paragraph.y]` Bottom Right `[x = paragraph.x, y = 0]`) |
| `stimulus_fixation_x` | If paragrah is hit: horizontal fixation position relative in the paragraph box (Top left `[x = 0.0, y = paragraph.y]` Bottom Right `[x = paragraph.x, y = 0]`) |
| `stimulus_fixation_y` |If paragrah is hit: vertical fixation position relative in the paragraph box (Top left `[x = 0.0, y = paragraph.y]` Bottom Right `[x = paragraph.x, y = 0]`) |