import numpy as np
import logging
import math

from typing import List
from scipy.spatial import ConvexHull

from .fixation_event import FixationEvent
from .saccade_event import SaccadeEvent
from .fixation_area import FixationArea, HorizontalFixationArea


def extract_fixation_features(fixations):
    if len(fixations) == 0:
        logging.warning("Cannot extract features from zero fixations. Returning np.nan")
        return {
            "fixn_n": np.nan,
            "fixn_dur_sum": np.nan,
            "fixn_dur_avg": np.nan,
            "fixn_dur_sd": np.nan
        }

    durations = np.array([f.duration for f in fixations], dtype=np.float)
    return {
        "fixn_n": len(fixations),
        "fixn_dur_sum": durations.sum(),
        "fixn_dur_avg": durations.mean(),
        "fixn_dur_sd": durations.std()
    }


def extract_saccade_features(saccades, time_elapsed=1, h=1, w=1):
    if len(saccades) == 0:
        return {}

    scan_distance_h = np.sum([s.amplitude_h for s in saccades]) / w
    scan_distance_v = np.sum([s.amplitude_v for s in saccades]) / h
    scan_distance_euclid = sum([math.sqrt((s.amplitude_h / w)**2 + (s.amplitude_v / h) ** 2) for s in saccades])
    scan_hv_ratio = scan_distance_h / scan_distance_v if scan_distance_v > 0 else scan_distance_h

    avg_saccade_length = scan_distance_euclid / len(saccades)

    scan_speed_h = scan_distance_h / time_elapsed
    scan_speed_v = scan_distance_v / time_elapsed
    scan_speed = scan_distance_euclid / time_elapsed

    return {
        "scan_distance_h": scan_distance_h,
        "scan_distance_v": scan_distance_v,
        "scan_distance_euclid": scan_distance_euclid,
        "scan_hv_ratio": scan_hv_ratio,
        "avg_sacc_length": avg_saccade_length,
        "scan_speed_h": scan_speed_h,
        "scan_speed_v": scan_speed_v,
        "scan_speed": scan_speed
    }


def extract_area_features(fixations, input_features, stimulus_area=1):
    total_time = input_features["total_time"]
    if "scan_distance_h" not in input_features or "scan_distance_v" not in input_features:
        logging.warning("no valid saccade features")
        return {}
    box_area = input_features["scan_distance_h"] * input_features["scan_distance_v"]

    # convex hull features
    hull_area = np.nan
    hull_area_per_time = np.nan
    fixns_per_hull_area = np.nan
    if len(fixations) >= 3:
        fixation_pts = np.array([[f.gaze_x, f.gaze_y_stimulus] for f in fixations])
        hull = ConvexHull(fixation_pts)
        hull_area = hull.volume / stimulus_area  # for 2D: area is the perimeter, volume is the area
        hull_area_per_time = hull_area / total_time
        fixns_per_hull_area = len(fixations) / hull_area
    else:
        logging.warning(f"not enough fixations ({len(fixations)}) for convex hull features")

    return {
        "box_area": box_area,
        "box_area_per_time": box_area / total_time,
        "fixns_per_box_area": box_area / len(fixations),
        # "hull_area": hull_area,
        "hull_area_per_time": hull_area_per_time,
        "fixns_per_hull_area": fixns_per_hull_area
    }


def extract_features(df, stimulus_width=1, stimulus_height=1):  # , additional_info=None
    """ Feature extraction. """
    fixations = FixationEvent.from_dataframe(df)
    saccades = SaccadeEvent.from_fixations(fixations)
    total_time = df["timestamp"].values[-1] - df["timestamp"].values[0]

    if len(saccades) == 0:
        logging.warning("no saccades for feature computation.")

    if len(fixations) == 0:
        logging.warning("no fixations for feature computation.")

    if len(saccades) - len(fixations) > 1:
        logging.warning(f"{len(fixations)} with {len(saccades)} saccades.")

    features = {
        "total_time": total_time
    }
    features.update(extract_fixation_features(fixations))
    features.update(
        extract_saccade_features(saccades=saccades, time_elapsed=total_time, w=stimulus_width, h=stimulus_height)
    )
    features.update(
        extract_area_features(fixations, features, stimulus_area=stimulus_width * stimulus_height)
    )

    # TODO: discuss differences to Bhattacharya et al.
    #  * they use fixation points f_i, f_i+1 to define saccade lengths,
    #    we use last gaze point of f_i and first point of f_i+1
    #  * they use time elasped in task for 0.5s data intervalls (cumulative);
    #    we compute the time elapsed for the given fixations => intervals would be handled before calling this function
    #  * they count saccades from fixation to fixation --> they ignore saccades in the beginning and end of the trial

    return features
