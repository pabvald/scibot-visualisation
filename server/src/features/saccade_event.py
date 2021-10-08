import numpy as np

from typing import List
from .fixation_event import FixationEvent


class SaccadeEvent:

    def __init__(self, event_id: int, start_fixation: FixationEvent, end_fixation: FixationEvent):
        self._duration = end_fixation.start_time - start_fixation.end_time
        self._amplitude_h = np.fabs(end_fixation.gaze_x - start_fixation.gaze_x)
        self._amplitude_v = np.fabs(end_fixation.gaze_y_stimulus - start_fixation.gaze_y_stimulus)
        self._id = event_id

    @property
    def duration(self):
        return self._duration

    @property
    def amplitude_h(self):
        return self._amplitude_h

    @property
    def amplitude_v(self):
        return self._amplitude_v

    # @property
    # def amplitude(self):
    #     return math.sqrt(self.amplitude_h**2 + self.amplitude_v**2)

    @property
    def velocity_h(self):
        return self.amplitude_h / self.duration

    @property
    def velocity_v(self):
        return self.amplitude_v / self.duration

    # @property
    # def velocity(self):
    #     return self.amplitude / self.duration

    @staticmethod
    def from_fixations(fixations: List[FixationEvent]):
        saccades = []
        for i in range(len(fixations)-1):
            saccades.append(SaccadeEvent(event_id=i, start_fixation=fixations[i], end_fixation=fixations[i+1]))

        return saccades


class SaccadeEventWithReadingState(SaccadeEvent):
    def __init__(self, event_id: int, start_fixation: FixationEvent, end_fixation: FixationEvent):
        super(SaccadeEventWithReadingState, self).__init__(event_id, start_fixation, end_fixation)
        self._saccade_direction_h = np.sign(end_fixation.gaze_x - start_fixation.gaze_x)
        self._saccade_type = ''
        self._start_fixation = start_fixation
        self._reading_state = ""

    @property
    def saccade_direction_h(self):
        return self._saccade_direction_h

    @property
    def saccade_type(self):
        return self._saccade_type

    @saccade_type.setter
    def saccade_type(self, new_type):
        self._saccade_type = new_type

    @property
    def start_fixation(self):
        return self._start_fixation

    @property
    def reading_state(self):
        return self._reading_state

    @reading_state.setter
    def reading_state(self, reading_state):
        self._reading_state = reading_state

    def update_reading_state_for_fixation(self, reading_state):
        self.start_fixation.reading_state = reading_state

    @staticmethod
    def from_fixations(fixations: List[FixationEvent]):
        saccades = []
        for i in range(len(fixations)-1):
            saccades.append(SaccadeEventWithReadingState(event_id=i, start_fixation=fixations[i], end_fixation=fixations[i+1]))

        return saccades
