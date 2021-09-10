import time
import pandas as pd
import zmq
import os
import subprocess
import json
import numpy as np

from gaze_event_detection.basic_detection import GazeEventDetection
from gaze_event_detection.preprocess import gap_fill, regularize_timestamps, median_filter

_EXCLUDE_USER_LIST = ["A02", "A05"]
_INCLUDE_USER_LIST = []  # if emtpy every user besides excluded will be analysed
_INCLUDE_DATA_TYPE = ["GoogleNQ"]  # "g_rel", "GoogleNQ"
_INCLUDE_STUDY_TYPE = ["main", "train"]  # "main", "train"


class Sender:
    def __init__(self, path, port, speed_up=1, scibot_path=""):
        self.scibot_path = scibot_path
        self.path = path
        self.speed_up = speed_up
        self.port = port
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PUB)
        self.socket.bind("tcp://*:%s" % self.port)
        self.dataframe_reading = []
        self.dataframe_rating = []
        self.gaze_event_detection = GazeEventDetection()

    def next_screen(self):
        self.socket.send_string("next")
        time.sleep(1)

    def end_article(self):
        self.socket.send_string("end")
        time.sleep(1)

    def start_scibot(self, user, datatype, studytype, order):
        with open(os.path.join(self.scibot_path, 'config.json'), 'r') as f:
            config = json.load(f)

        # edit the data
        config['user'] = user
        config['input'] = datatype
        config['mode'] = studytype
        config['order'] = order

        # write it back to the file
        with open(os.path.join(self.scibot_path, 'config.json'), 'w') as f:
            json.dump(config, f)
        command = "\"%s\"" % os.path.join(self.scibot_path, "demo.py")
        subprocess.Popen(command, shell=True, cwd=self.scibot_path)
        if studytype == "main":
            time.sleep(25)
        else:
            time.sleep(5)

    def start_sending(self, user, datatype, studytype):

        for log_file in os.scandir(os.path.join(self.path, user, datatype, studytype)):
            if "Reading" in log_file.name:
                data = pd.read_csv(log_file.path, delimiter="|", encoding='utf-8', float_precision='round_trip')
                number, name = str.split(log_file.name.replace(".html_Reading.csv", ""), "_", maxsplit=1)
                df = pd.DataFrame(data=data)
                fixation = self.gaze_event_detection.fixation_detection(df)
                self.dataframe_reading.append(((int(number), name), df, fixation))
                starttimes, ret = self.gaze_event_detection.fixation_detection(df)
            elif "User_Rating" in log_file.name:
                continue
            else:
                data = pd.read_csv(log_file.path, delimiter="|", encoding='utf-8', float_precision='round_trip')
                number, name = str.split(log_file.name.replace(".html_Rating.csv", ""), "_", maxsplit=1)
                df = pd.DataFrame(data=data)
                fixation = self.gaze_event_detection.fixation_detection(df)
                self.dataframe_rating.append(((int(number), name), df, fixation))

        self.dataframe_reading.sort(key=lambda x: x[0][0])
        self.dataframe_rating.sort(key=lambda x: x[0][0])

        # self.start_scibot(user, datatype, studytype, [a_tuple[0][1] for a_tuple in self.dataframe_reading])

        # set starting_point for data_set-time and replay_time
        start_time = time.time()
        data_start_time = None

        # iterating through the data
        for reading, rating in zip(self.dataframe_reading, self.dataframe_rating):
            self.next_screen()

            list_reading = reading[1].values.tolist()
            list_rating = rating[1].values.tolist()
            list_fixation_reading = reading[2]
            list_fixation_rating = rating[2]

            count = 0
            fixation_len = len(list_fixation_reading[0])
            for row in list_reading:
                # set start_time for data_set
                if data_start_time is None:
                    data_start_time = row[0]

                if row[1] == 'None':
                    continue

                # while 'now' is too soon for the next time_increment -> wait
                while row[0] - data_start_time >= (time.time() - start_time) * self.speed_up:
                    pass

                if count < fixation_len:
                    if list_fixation_reading[0][count][0] == row[0]:
                        self.socket.send_string(
                            ("fixation|" + "|".join(map(str, (list_fixation_reading[1][count])))) + ("|" + str(count)))
                        count += 1
                self.socket.send_string("|".join([str(row[0]), str(row[1]), str(row[2]), str(row[5])]))

            self.next_screen()

            count = 0
            fixation_len = len(list_fixation_rating[0])
            for row in list_rating:
                # set start_time for data_set
                if data_start_time is None:
                    data_start_time = row[0]

                if row[1] == 'None':
                    continue

                # while 'now' is too soon for the next time_increment -> wait
                while row[0] - data_start_time >= (time.time() - start_time) * self.speed_up:
                    pass

                if count < fixation_len:
                    if list_fixation_rating[0][count][0] == row[0]:
                        self.socket.send_string(
                            ("fixation|" + "|".join(map(str, list_fixation_rating[1][count]))) + ("|" + str(count)))
                        count += 1
                self.socket.send_string("|".join([str(row[0]), str(row[1]), str(row[2]), str(row[5])]))
            self.end_article()
            self.next_screen()
        self.dataframe_reading.clear()
        self.dataframe_rating.clear()

    def start_sending_idt(self, user, datatype, studytype):

        FRAME_RATE = 83  # [Hz]
        MIN_BLINK_TIME = 50  # [ms]
        MAX_GAP_LENGTH = MIN_BLINK_TIME  # [ms]
        FILTER_SIZE = 20  # [ms]
        MAX_FIX_DISPERSION = 50  # [px]
        MIN_FIX_DURATION = 50  # [ms]

        for log_file in os.scandir(os.path.join(self.path, user, datatype, studytype)):
            print(user + datatype + studytype)
            if "Reading" in log_file.name:
                data = pd.read_csv(log_file.path, delimiter="|", encoding='utf-8', float_precision='round_trip')
                number, name = str.split(log_file.name.replace(".html_Reading.csv", ""), "_", maxsplit=1)
                df = pd.DataFrame(data=data)
                t = t_abs = df["timestamp"].values
                x = x_abs = df["gaze_x"].values
                y = df["gaze_y"].values
                y_abs = df["abs_y"].values

                t_diff = np.diff(t)
                measured_rate = 1. / np.median(t_diff)

                t, x, y = regularize_timestamps(t, x, y, FRAME_RATE)
                t, x, y = gap_fill(t, x, y, max_gap_length=MAX_GAP_LENGTH)
                t_abs, x_abs, y_abs = regularize_timestamps(t_abs, x_abs, y_abs, FRAME_RATE)
                t_abs, x_abs, y_abs = gap_fill(t_abs, x_abs, y_abs, max_gap_length=MAX_GAP_LENGTH)
                fixation = self.gaze_event_detection.fixation_detection_idt(t_abs, x_abs, y_abs)
                self.dataframe_reading.append({"number": int(number), "name": name, "t": t, "x": x, "y": y,
                                               "y_abs": y_abs, "fixation": fixation})

            elif "User_Rating" in log_file.name:
                continue
            else:
                data = pd.read_csv(log_file.path, delimiter="|", encoding='utf-8', float_precision='round_trip')
                number, name = str.split(log_file.name.replace(".html_Rating.csv", ""), "_", maxsplit=1)
                df = pd.DataFrame(data=data)
                t = t_abs = df["timestamp"].values
                x = x_abs = df["gaze_x"].values
                y = df["gaze_y"].values
                y_abs = df["abs_y"].values

                t_diff = np.diff(t)
                measured_rate = 1. / np.median(t_diff)

                t, x, y = regularize_timestamps(t, x, y, FRAME_RATE)
                t, x, y = gap_fill(t, x, y, max_gap_length=MAX_GAP_LENGTH)
                t_abs, x_abs, y_abs = regularize_timestamps(t_abs, x_abs, y_abs, FRAME_RATE)
                t_abs, x_abs, y_abs = gap_fill(t_abs, x_abs, y_abs, max_gap_length=MAX_GAP_LENGTH)
                fixation = self.gaze_event_detection.fixation_detection_idt(t_abs, x_abs, y_abs)
                self.dataframe_rating.append({"number": int(number), "name": name, "t": t, "x": x, "y": y,
                                              "y_abs": y_abs, "fixation": fixation})

        self.dataframe_reading = sorted(self.dataframe_reading, key=lambda k: k['number'])
        self.dataframe_rating = sorted(self.dataframe_rating, key=lambda k: k['number'])
        # self.start_scibot(user, datatype, studytype, [frame["name"] for frame in self.dataframe_reading])
        # set starting_point for data_set-time and replay_time
        start_time = time.time()
        data_start_time = None

        # iterating through the data
        for reading, rating in zip(self.dataframe_reading, self.dataframe_rating):
            self.next_screen()
            list_fixation_reading = reading["fixation"]
            list_fixation_rating = rating["fixation"]

            count = 0
            fixation_len = len(reading)
            for i, (t, x, y, y_abs) in enumerate(zip(reading["t"], reading["x"], reading["y"], reading["y_abs"])):
                # set start_time for data_set
                if data_start_time is None:
                    data_start_time = t

                if x == 'None':
                    continue

                # while 'now' is too soon for the next time_increment -> wait
                while t - data_start_time >= (time.time() - start_time) * self.speed_up:
                    pass

                if count < fixation_len:
                    if i in range(list_fixation_reading[count][0], list_fixation_reading[count][1]):
                        self.socket.send_string(
                            ("fixation|" + "|".join([str(t), str(x), str(y)]) + ("|" + str(count))))
                        count += 1
                self.socket.send_string("|".join([str(t), str(x), str(y), str(y_abs)]))

            self.next_screen()
            data_start_time = None

            count = 0
            fixation_len = len(list_fixation_rating[0])
            for i, (t, x, y, y_abs) in enumerate(zip(reading["t"], reading["x"], reading["y"], reading["y_abs"])):
                # set start_time for data_set
                if data_start_time is None:
                    data_start_time = t

                if x == 'None':
                    continue

                    # while 'now' is too soon for the next time_increment -> wait
                while t - data_start_time >= (time.time() - start_time) * self.speed_up:
                    pass

                if count < fixation_len:
                    if i in range(list_fixation_reading[count][0], list_fixation_reading[count][1]):
                        self.socket.send_string(
                            ("fixation|" + "|".join([str(t), str(x), str(y)]) + ("|" + str(count))))
                        count += 1
                self.socket.send_string("|".join([str(t), str(x), str(y), str(y_abs)]))
            self.end_article()
            self.next_screen()
        self.dataframe_reading.clear()
        self.dataframe_rating.clear()


if __name__ == '__main__':
    # sender = Sender(path="out/", speed_up=10,
    #                port=5556, scibot_path="C:\\Users\\scibot\\scibot_study_01\\")
    data_dir = "/Users/ombh/DFKI_Projects/scibot-study-analysis/data_v2_abs"
    sender = Sender(path=data_dir, speed_up=1,
                    port=5556, scibot_path="C:\\Users\\scibot\\scibot_study_01")
    start_time = time.time()
    for user_data in os.scandir(data_dir):
        if user_data.is_file():
            continue
        elif user_data.name not in _EXCLUDE_USER_LIST and (
                not _INCLUDE_USER_LIST or user_data.name in _INCLUDE_USER_LIST):
            for datatype in _INCLUDE_DATA_TYPE:
                for studytype in _INCLUDE_STUDY_TYPE:
                    sender.start_sending_idt(user=user_data.name, datatype=datatype, studytype=studytype)

    print(time.time() - start_time)
