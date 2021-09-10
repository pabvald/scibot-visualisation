from typing import List, Tuple

import numpy as np
import pandas as pd

# FixationEventDetection
from gaze_event_detection.eye_movements import Fixation


class GazeEventDetection:

    def GazeEventDetection(self):
        pass

    def remove_missing(self, x, y, time, missing):
        mx = np.array(x == missing, dtype=int)
        my = np.array(y == missing, dtype=int)
        x = x[(mx + my) != 2]
        y = y[(mx + my) != 2]
        time = time[(mx + my) != 2]
        return x, y, time

    def fixation_detection(self, df, missing=0.0, maxdist=6, mindur=0.11):
        # 600 mm  / 2560
        """Detects fixations, defined as consecutive samples with an inter-sample
        distance of less than a set amount of pixels (disregarding missing data)

        arguments
        df      -   dataframe of reading/rating part of trial

        keyword arguments
        missing	-	value to be used for missing data (default = 0.0)
        maxdist	-	maximal inter sample distance in mm (default = 6)
        mindur	-	minimal duration of a fixation in seconds; detected
                    fixation cadidates will be disregarded if they are below
                    this duration (default = 0.11)

        returns
        Sfix, Efix
                    Sfix	-	list of lists, each containing [starttime]
                    Efix	-	list of lists, each containing [starttime, endtime, duration, endx, endy]
        """

        x = df["gaze_x"].to_numpy()
        y = df["gaze_y"].to_numpy()
        time = df["timestamp"].to_numpy()
        x, y, time = self.remove_missing(x, y, time, missing)
        # convert the maxdist from mm to pixel | original screen size 600mm on 2560pixel
        maxdist = 2560 / 600 * maxdist

        # empty list to contain data
        Sfix = []
        Efix = []

        # loop through all coordinates
        si = 0
        fixstart = False
        for i in range(1, len(x)):
            # calculate Euclidean distance from the current fixation coordinate
            # to the next coordinate
            squared_distance = ((x[si] - x[i]) ** 2 + (y[si] - y[i]) ** 2)
            dist = 0.0
            if squared_distance > 0:
                dist = squared_distance ** 0.5
            # check if the next coordinate is below maximal distance
            if dist <= maxdist and not fixstart:
                # start a new fixation
                si = 0 + i
                fixstart = True
                Sfix.append([time[i]])
            elif dist > maxdist and fixstart:
                # end the current fixation
                fixstart = False
                # only store the fixation if the duration is ok
                if time[i - 1] - Sfix[-1][0] >= mindur:
                    Efix.append([Sfix[-1][0], time[i - 1], time[i - 1] - Sfix[-1][0], x[si], y[si]])
                # delete the last fixation start if it was too short
                else:
                    Sfix.pop(-1)
                si = 0 + i
            elif not fixstart:
                si += 1
        # add last fixation end (we can lose it if dist > maxdist is false for the last point)
        if len(Sfix) > len(Efix):
            Efix.append([Sfix[-1][0], time[len(x) - 1], time[len(x) - 1] - Sfix[-1][0], x[si], y[si]])
        return Sfix, Efix

    def merge_adjacent_fixations(self, t: np.array, x: np.array, y: np.array, events: List[Tuple[int, int]],
                                 max_time_between_fixations: int = 75,
                                 max_distance_between_fixations: int = 100):
        num_merged = 0
        i = 0
        while i < len(events) - 1:

            f1 = Fixation.from_indices(t, x, y, events[i][0], events[i][1])
            f2 = Fixation.from_indices(t, x, y, events[i + 1][0], events[i + 1][1])

            time_between_fixations = f2.start_time - f1.end_time
            distance_between_fixations = np.linalg.norm(f1.centroid - f2.centroid)
            if time_between_fixations < max_time_between_fixations and \
                    distance_between_fixations < max_distance_between_fixations:
                events[i] = (events[i][0], events[i + 1][1])
                del events[i + 1]
                num_merged += 1
            else:
                i += 1

    def dispersion_salvucci_goldberg(self, x: np.array, y: np.array) -> float:
        """Dispersion as defined by Salvucci and Goldberg.

        An actual unique definition is not available, some use the standard deviation or similar measures. We define it
        as
        Dispersion = max(x)-min(x) + max(y) - min(y)

        Note that we do not use the factor 0.5 as in
        "Eye Tracking A comprehensive Guide to Methods And Measures" (Holmqvist & Nyström, 2011)
        as SMI BeGaze does neither, judging from the documentation.
        """

        assert x.size > 0
        assert x.size == y.size
        return (x.max() - x.min()) + (y.max() - y.min())

    def fixation_detection_idt(self, t: np.array, x: np.array, y: np.array, max_dispersion: int = 100,
                               min_duration: int = 50,
                               merge_adjacent: bool = True, max_time_between_fixations: int = 75,
                               max_distance_between_fixations: int = 100):
        frame_time = (t[1] - t[0]) * 1000.
        num_samples = len(t)

        active_fixation = False
        window_pos = 0
        base_window_size = int(np.ceil(min_duration / frame_time))
        window_size = base_window_size

        events = []

        while window_pos < len(t) - base_window_size:
            window_end = min(window_pos + window_size, num_samples - 1)

            x_ = x[window_pos: window_end]
            y_ = y[window_pos: window_end]

            if not x_.any():
                print("empty")
            dispersion = self.dispersion_salvucci_goldberg(x_, y_)
            if dispersion > max_dispersion or np.any(np.isnan(x_)):
                if active_fixation:
                    events.append((window_pos, window_end))
                    active_fixation = False

                    window_pos = window_end + 1
                    window_size = base_window_size
                else:
                    window_pos += 1
            else:
                active_fixation = True
                window_size += 1

                if window_pos + window_size >= num_samples - 1:
                    events.append((window_pos, window_end))
                    break

        if merge_adjacent:
            self.merge_adjacent_fixations(t, x, y, events,
                                          max_distance_between_fixations=max_distance_between_fixations,
                                          max_time_between_fixations=max_time_between_fixations)

        return events
