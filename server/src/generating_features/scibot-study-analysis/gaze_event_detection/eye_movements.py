import pandas as pd
import numpy as np


class Fixation:

    def __init__(self, t, x, y):
        self.data = pd.DataFrame.from_dict({
            "t": t, "x": x, "y": y
        })

    @staticmethod
    def from_indices(t, x, y, start, end):
        return Fixation(t[start:end], x[start:end], y[start:end])

    @property
    def start_time(self):
        return self.data["t"][0]

    @property
    def end_time(self):
        return self.data["t"].iloc[-1]

    @property
    def centroid(self):
        xy = self.data.iloc[:, 1:]
        return np.mean(xy.values, axis=0)
