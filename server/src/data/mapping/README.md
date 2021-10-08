# Mapping of tokens coordinates

This folder contains the mappings of the coordinates of both paragraphs and labels/tokens of every article.
For each article, e.g. `g-rel_q075-1_i.html`, there are two `csv` files:

- File containing the coordinates of the paragraphs, e.g. `g-rel_q075-1_i_paragraphs.csv`
- File containing the coordinates of the labels/tokens file, e.g. `g-rel_q075-1_i_labels.csv`

### Data structure 
#### Paragraphs 

| field | description |
| ------- | :---------- |
| `paragraph_id` | ID of the paragraph that is hit by the gaze signal `[-2 to 6]` with `-1` referring to the headline area and `-2` referring to the remaining free space |
| `x1` | First normalized  x coordinate. For all articles its value will be within the interval `[0, 1]`.|
| `y1` | First normalized  y coordinate. For the `g-REL` articles its value will be within the interval `[0, 1]`; however, for the `Google_NQ` articles, its value can be greater than `1.0`, depending on the article's length|
| `x2` | Second normalized  x coordinate. For all articles its value will be within the interval `[0, 1]`.|
| `y2` | Second normalized  y coordinate. For the `g-REL` articles its value will be within the interval `[0, 1]`; however, for the `Google_NQ` articles, its value can be greater than `1.0`, depending on the article's length|

Version 04: the articles of the `g-REL` corpus are considered to have a single paragraph that includes the title. The coordinates of the 
previous division in more paragraphs are stored in the files with the `_paragraphs_split.csv` extension. The axis origin 
that is considered to obtain the coordinates is **bottom left (BL)**.

Version 05:  the articles of the `g-REL` corpus are considered to have a single paragraph that includes the title. The coordinates of the 
previous division in more paragraphs are stored in the files with the `_paragraphs_split.csv` extension. The axis origin 
that is considered to obtain the coordinates is **top left (TL)**.


#### Labels/tokens
| field | description |
| ------- | :---------- |
| `paragraph_id` | ID of the paragraph that is hit by the gaze signal `[-2 to 6]` with `-1` referring to the headline area and `-2` referring to the remaining free space |
| `label_id` | ID of the label within the paragraph |
| `x1` | First normalized  x coordinate. For all articles its value will be within the interval `[0, 1]`.|
| `y1` | First normalized  y coordinate. For the `g-REL` articles its value will be within the interval `[0, 1]`; however, for the `Google_NQ` articles, its value can be greater than `1.0`, depending on the article's length|
| `x2` | Second normalized  x coordinate. For all articles its value will be within the interval `[0, 1]`.|
| `y2` | Second normalized  y coordinate. For the `g-REL` articles its value will be within the interval `[0, 1]`; however, for the `Google_NQ` articles, its value can be greater than `1.0`, depending on the article's length|


Version 04: the articles of the `g-REL` corpus are considered to have a single paragraph that includes the title. The coordinates of the 
previous division in more paragraphs are stored in the files with the `_labels_split.csv` extension. The axis origin 
that is considered to obtain the coordinates is **bottom left (BL)**.

Version 05: the articles of the `g-REL` corpus are considered to have a single paragraph that includes the title. The coordinates of the 
previous division in more paragraphs are stored in the files with the `_labels_split.csv` extension. The axis origin 
that is considered to obtain the coordinates is **top left (TL)**.
