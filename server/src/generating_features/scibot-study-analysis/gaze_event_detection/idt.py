import numpy as np
from gaze_event_detection.eye_movements import Fixation
from typing import List, Tuple


def merge_adjacent_fixations(t: np.array, x: np.array, y: np.array, events: List[Tuple[int, int]],
                             max_time_between_fixations: int = 75,
                             max_distance_between_fixations: int = 100):
    num_merged = 0
    i = 0
    while i < len(events) - 1:

        f1 = Fixation.from_indices(t, x, y, events[i][0], events[i][1])
        f2 = Fixation.from_indices(t, x, y, events[i+1][0], events[i+1][1])

        time_between_fixations = f2.start_time - f1.end_time
        distance_between_fixations = np.linalg.norm(f1.centroid - f2.centroid)
        if time_between_fixations < max_time_between_fixations and \
                distance_between_fixations < max_distance_between_fixations:
            events[i] = (events[i][0], events[i+1][1])
            del events[i+1]
            num_merged += 1
        else:
            i += 1


def dispersion_salvucci_goldberg(x: np.array, y: np.array) -> float:
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


def fixation_detection(t: np.array, x: np.array, y: np.array, max_dispersion: int = 50, min_duration: int = 100,
                       merge_adjacent: bool = True, max_time_between_fixations: int = 75,
                       max_distance_between_fixations: int = 50):
    frame_time = (t[1] - t[0]) * 1000.
    num_samples = len(t)

    active_fixation = False
    window_pos = 0
    base_window_size = int(np.ceil(min_duration / frame_time))
    window_size = base_window_size

    events = []

    while window_pos < len(t):
        window_end = min(window_pos + window_size, num_samples - 1)

        x_ = x[window_pos: window_end]
        y_ = y[window_pos: window_end]

        dispersion = dispersion_salvucci_goldberg(x_, y_)
        if dispersion > max_dispersion or np.any(np.isnan(x_)):
            if active_fixation:
                events.append((window_pos, window_end -1))
                active_fixation = False

                window_pos = window_end # +1
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
        merge_adjacent_fixations(t, x, y, events, max_distance_between_fixations=max_distance_between_fixations,
                                 max_time_between_fixations=max_time_between_fixations)

    return events



