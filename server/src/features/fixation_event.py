import pandas as pd
import numpy as np

from typing import List


class FixationEvent:

    def __init__(self, fixation_id, fixation_data):
        self._df = fixation_data
        self._id = fixation_id

    @property
    def duration(self):
        return self.end_time - self.start_time

    @property
    def start_time(self):
        return self._df["timestamp"].values[0]

    @property
    def end_time(self):
        return self._df["timestamp"].values[-1]

    @property
    def gaze_x(self):
        return self._df["gaze_x"].mean()

    @property
    def gaze_y(self):
        return self._df["gaze_y"].mean()

    @property
    def gaze_y_stimulus(self):
        return self._df["gaze_y_abs"].mean()

    @staticmethod
    def from_dataframe(df: pd.DataFrame) -> List:
        fixation_groups = df.groupby(by="fixation_id")
        return [FixationEvent(_id, _df) for _id, _df in fixation_groups if _id != np.nan]
class FixationEventWithReadingState(FixationEvent):
    def __init__(self,fixation_id, fixation_data):
        super.__init__(fixation_id, fixation_data)
        self._reading_state = ""

    @property
    def reading_state(self):
        return self._reading_state

    @reading_state.setter
    def reading_state(self, reading_state):
        self._reading_state = reading_state

    @property
    def paragraph_id(self):
        value_counts = self._df.groupby('paragraph_id').value_counts()
        return value_counts.index[0][0]