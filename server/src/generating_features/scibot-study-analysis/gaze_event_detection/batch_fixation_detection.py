from data_loading.data_loader import SciBot_DataLoader
from gaze_event_detection.preprocess import regularize_timestamps, gap_fill, median_filter
from gaze_event_detection.idt import fixation_detection
from gaze_event_detection.eye_movements import Fixation
from matplotlib import figure
import matplotlib.pyplot as plt
import numpy as np
import logging


plt.rcParams["figure.figsize"] = (30, 5)
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def plot_gaze(t, x, y, fixation_events=None, title=None):

    fig, ax = plt.subplots()
    ax.plot(t, x - np.min(x), label="x")
    ax.plot(t, y - np.min(y), label="y")

    if fixation_events is not None:
        for e in fixation_events:
            f = Fixation.from_indices(t, x, y, e[0], e[1])
            ax.plot([f.start_time, f.end_time], [0, 0], color="green", linewidth=3)

    if title is not None:
        ax.set_title(title)
    ax.set_xlabel("time")
    ax.set_ylabel("gaze signal")
    ax.legend()

    plt.show()


if __name__ == '__main__':

    FRAME_RATE = 83  # [Hz]
    MIN_BLINK_TIME = 50  # [ms]
    MAX_GAP_LENGTH = MIN_BLINK_TIME  # [ms]
    FILTER_SIZE = 20  # [ms]
    MAX_FIX_DISPERSION = 50  # [px]
    MIN_FIX_DURATION = 50  # [ms]

    logger.info("Applying I-DT fixation algorithm on our data.")

    # load data
    data_dir = "C:/Users/miba01/dfki.de/Team_SciBot - General/SciBot Dataset/data_v02"
    logger.info(f"loading SciBot dataset (reading task) from {data_dir}")
    dataloader = SciBot_DataLoader(data_dir=data_dir, include_users=["A01"], gaze_data=True, reading_task=True,
                                   rating_task=False, training_data=False)  # exclude_users=["A02", "A05"]

    scanpath = dataloader.grel_reading["A01"]["g-rel_q116-1"]

    cut_beginning = 25
    cut_end = 40
    t = scanpath["dataframe"]["timestamp"][cut_beginning:-cut_end].values
    x = scanpath["dataframe"]["gaze_x"][cut_beginning:-cut_end].values
    y = scanpath["dataframe"]["gaze_y"][cut_beginning:-cut_end].values

    t_diff = np.diff(t)
    measured_rate = 1. / np.median(t_diff)
    assert 0 <= FRAME_RATE - measured_rate <= 1., f"target framerate {FRAME_RATE} " \
                                                  f"differs from measured rate {measured_rate}"

    t, x, y = regularize_timestamps(t, x, y, FRAME_RATE)

    t, x, y = gap_fill(t, x, y, max_gap_length=MAX_GAP_LENGTH)

    x, y = median_filter(t, x, y, time_window=FILTER_SIZE)

    has_nan = np.any(np.isnan(x))

    fixation_events = fixation_detection(t, x, y, max_dispersion=MAX_FIX_DISPERSION, min_duration=MIN_FIX_DURATION,
                                         max_distance_between_fixations=MAX_FIX_DISPERSION,
                                         max_time_between_fixations=MIN_FIX_DURATION)

    view_size = 500
    fixation_event_view = [f for f in fixation_events if f[1] < view_size]
    plot_gaze(t[:view_size], x[:view_size], y[:view_size], fixation_events=fixation_event_view, title="fixations")

    raise NotImplementedError()

    for user, user_data in dataloader.grel_reading.items():
        for document, document_data in user_data.items():
            logger.debug(f"processing {user}-{document}")




