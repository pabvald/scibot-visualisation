import numpy as np
from scipy.signal import medfilt
from scipy.interpolate import interp1d
import logging


logger = logging.getLogger(__name__)
arr = np.ndarray


def regularize_timestamps(t: arr, x: arr, y: arr, rate: int = 60):
    """ Fix irregular timestamps. """
    t = t - t[0]
    dur = t[-1] - t[0]

    num_samples = round(dur * rate)
    t_ = np.linspace(0, dur, num=num_samples)
    x_ = np.empty(shape=(num_samples,), dtype=x.dtype)
    y_ = np.empty(shape=(num_samples,), dtype=y.dtype)
    x_.fill(np.nan)
    y_.fill(np.nan)

    num_skipped = 0
    num_valid = 0
    for i in range(len(t)):
        # find the closest timestamp regular timestamps
        i_ = np.argmin(np.fabs(t_ - t[i]))
        # if no valid sample was found for this timestamp
        if np.isnan(x_[i_]):
            # set values
            x_[i_] = x[i]
            y_[i_] = y[i]
            num_valid += 1
        else:
            num_skipped += 1
    num_missing = num_samples - num_valid
    logger.info(f"missing samples: {num_missing}/{num_samples} (skipped {num_skipped})")

    return t_, x_, y_


def _gap_interpolation(t, x, y, gap_start, gap_end):
    fx = interp1d(x=[t[gap_start], t[gap_end]], y=[x[gap_start], x[gap_end]])
    fy = interp1d(x=[t[gap_start], t[gap_end]], y=[y[gap_start], y[gap_end]])
    x[gap_start + 1:gap_end] = fx(t[gap_start + 1:gap_end])
    y[gap_start + 1:gap_end] = fy(t[gap_start + 1:gap_end])


def gap_fill(t: arr, x: arr, y: arr, max_gap_length: float = 22):
    gaps_filled: int = 0
    samples_interpolated: int = 0

    last_valid_id = -1
    frame_length = t[1] - t[1]

    for i in range(0, len(t)):
        valid = not np.isnan(x[i])
        if not valid:
            continue
        else:
            # check if there is at least one invalid sample between two valid samples
            if 0 <= last_valid_id < i - 1:
                gap_length = t[i] - t[last_valid_id] - frame_length
                if gap_length <= max_gap_length:
                    _gap_interpolation(t, x, y, gap_start=last_valid_id, gap_end=i)
                    gaps_filled += 1
                    samples_interpolated += i - last_valid_id - 1

            last_valid_id = i

    logger.info(f"filled {gaps_filled} gaps with {samples_interpolated} samples.")
    return t, x, y


def median_filter(t: arr, x: arr, y: arr, time_window: int = 22):
    fps = len(t) / (np.max(t) - np.min(t))
    frame_time = 1000. / fps
    kernel_size = int(time_window / frame_time)
    if kernel_size % 2 == 0:
        kernel_size += 1
    if kernel_size < 3:
        kernel_size = 3

    x = medfilt(x, kernel_size=kernel_size)
    y = medfilt(y, kernel_size=kernel_size)

    return x, y
