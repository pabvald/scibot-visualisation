# Data
This folder contains the different datasets that are combined for the visualization.


## HTML files 
The `articles` folder contains the HTML files of both sets of articles: `g-rel` and `GoogleNQ`.


## Gaze data 
The folder `gaze` contains the eye-tracking data collected during the Scibot study. There is
a subfolder for each version of the data. Within each version folder, there is a subfolder
for each user who participated in the study.


## Mapping - Text coordinates
The folder `mapping` contains the coordinates (`x1`, `y1`, `x2`, `y2`) of every paragraph 
and token of every article. The coordinates are normalized. The dimensions of the monitor 
used during the study were `2560x1440`. 


## Paragraph features 
The folder `paragraph_features` contains the precomputed paragraph features for every
article-user. Check the readme in the `src/features` package for details.
