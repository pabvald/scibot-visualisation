import base64
import os

import cv2
import plotly.graph_objects as go
import plotly.express as px
from PIL import Image
from skimage import data
from statistics import mean

from data_loading.data_loader import SciBot_DataLoader
from features import FixationEvent
from gaze_visualizer import InteractiveGazeVisualizer, AxisOrigin
from gaze_event_detection.idt import fixation_detection

# FixationEvent aus idt u. batch fixation det DONE
# vertical line during hover on plot    DONE
# Check where the delay for the fixation    NOT IN REPLAY
#A06

scale_factor = 0.5

if __name__ == '__main__':
    test = os.getcwd()
    # load the Visualizer
    lib_v = InteractiveGazeVisualizer(origin=AxisOrigin.BL)

    # load data
    file_ext = "_new_fixn_abs.png"
    data_dir = "/Users/ombh/DFKI_Projects/scibot-study-analysis/data/gaze_data/fixn_idt_rel"
    dataloader = SciBot_DataLoader(data_dir=data_dir, include_users=["A01"], gaze_data=True, reading_task=True,
                                   rating_task=False, training_data=False, gREL=False)  # exclude_users=["A02", "A05"]

    # data_dir = "/Users/ombh/DFKI_Projects/scibot-study-analysis/data_v2_abs"
    # dataloader2 = SciBot_DataLoader(data_dir=data_dir, include_users=["A01"], gaze_data=True, reading_task=True,
    # rating_task=False, training_data=False, gREL=False)

    for user, user_data in dataloader.google_nq_reading.items():
        for filename in os.listdir("../data/stimuli/Google_NQ/"):
            image_path = os.path.join("../data/stimuli/Google_NQ/", filename)
            fig = go.Figure()
            document_id = filename[0:-4]
            df = user_data[document_id]["dataframe"]

            # Visualize gaze
            lib_v.image = image_path
            lib_v.visualize_gaze(x=df["gaze_x"], y=df["gaze_y_abs"])

            # Visualize fixation with custom paramaters
            t = df["timestamp"].values
            x = df["gaze_x"].values
            y = df["gaze_y"].values
            y_abs = df["gaze_y_abs"].values
            fixations = []
            events = fixation_detection(t=t, x=x, y=y)
            for (start, end) in events:
                fixations.append({"start_time": t[start], "end_time": t[end], "gaze_x": mean(x[start:end]),
                                  "gaze_y": mean(y_abs[start:end]), "duration": t[end] - t[start]})
            lib_v.visualize_fixations(fixations, numbered=True, text="new")
            fixations = []
            for (start, end) in events:
                fixations.append({"start_time": t[start], "end_time": t[end], "gaze_x": mean(x[start:end]),
                                  "gaze_y": mean(y_abs[start:end]), "duration": t[start] - t[end]})
            lib_v.visualize_events(fixations, label_y=-150)

            # Visualize fixation
            fix_events = FixationEvent.from_dataframe(df)
            fixations = []
            for event in fix_events:
                fixations.append({"start_time": event.start_time, "end_time": event.end_time, "gaze_x": event.gaze_x,
                                  "gaze_y": event.gaze_y_stimulus, "duration": event.duration})
            lib_v.visualize_fixations(fixations, numbered=True, text= "rec")


            lib_v.show_visualization_with_timeline(t=df["timestamp"], x=df["gaze_x"], y=df["gaze_y"], fixn=fixations)
            break
        break
