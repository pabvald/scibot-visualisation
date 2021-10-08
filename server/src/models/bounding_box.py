from enum import Enum

VIEWPORT_DIMS = {
    "nq_5p_a0_LTcw": {"viewport_width": 2560, "viewport_height": 2967},
    "nq_5p_a0_LTIz": {"viewport_width": 2560, "viewport_height": 3073},
    "nq_5p_a2_MTgz": {"viewport_width": 2560, "viewport_height": 2596},
    "nq_5p_a3_LTYx": {"viewport_width": 2560, "viewport_height": 2967},
    "nq_5p_a4_LTI3": {"viewport_width": 2560, "viewport_height": 2490},
    "nq_6p_a1_LTEy": {"viewport_width": 2560, "viewport_height": 2510},
    "nq_6p_a3_MzA5": {"viewport_width": 2560, "viewport_height": 3040},
    "nq_6p_a4_ODQz": {"viewport_width": 2560, "viewport_height": 3252},
    "nq_6p_a5_LTkw": {"viewport_width": 2560, "viewport_height": 2987},
    "nq_7p_a1_Mzgy": {"viewport_width": 2560, "viewport_height": 3272},
    "nq_7p_a2_LTYz": {"viewport_width": 2560, "viewport_height": 3484},
    "nq_7p_a5_NTE0": {"viewport_width": 2560, "viewport_height": 3590},
    "g-rel_q075-1_i": {"viewport_width": 2560, "viewport_height": 1137},
    "g-rel_q076-1_r": {"viewport_width": 2560, "viewport_height": 1369},
    "g-rel_q128-1_r": {"viewport_width": 2560, "viewport_height": 1263},
    "g-rel_q085-2_i": {"viewport_width": 2560, "viewport_height": 1190},
    "g-rel_q094-2_t": {"viewport_width": 2560, "viewport_height": 1243},
    "g-rel_q097-2_t": {"viewport_width": 2560, "viewport_height": 1308},
    "g-rel_q103-1_i": {"viewport_width": 2560, "viewport_height": 1190},
    "g-rel_q116-1_r": {"viewport_width": 2560, "viewport_height": 1230},
    "g-rel_q118-1_r": {"viewport_width": 2560, "viewport_height": 1190},
    "g-rel_q122-2_i": {"viewport_width": 2560, "viewport_height": 1402},
    "g-rel_q134-3_t": {"viewport_width": 2560, "viewport_height": 1296},
    "g-rel_q088-1_t": {"viewport_width": 2560, "viewport_height": 1263}
}


class AxisOrigin(Enum):
    BL = (0, 0)
    BR = (1, 0)
    TL = (0, 1)
    TR = (1, 1)


class BoundingBox(object):
    _SCREEN_WIDTH = 2560
    _SCREEN_HEIGHT = 1440

    def __init__(self, filename: str, bb_id: int, x1: float, y1: float, x2: float, y2: float):
        """

        Args:
            filename: name of the file
            bb_id: identifier
            x1: first normalized x coordinate
            y1: first normalized y coordinate
            x2: second normalized x coordinate
            y2: second normalized y coordinate
        """
        self._vp_w = VIEWPORT_DIMS[filename]['viewport_width']
        self._vp_h = VIEWPORT_DIMS[filename]['viewport_height']
        self._axis_origin = AxisOrigin.TL
        self._normalized_coord = True
        self._id = bb_id
        # normalized coordinates
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2

    @property
    def normalized_coord(self) -> bool:
        """ The coordinates are return normalized or not. """
        return self._normalized_coord

    @normalized_coord.setter
    def normalized_coord(self, nc: bool):
        self._normalized_coord = nc

    @property
    def axis_origin(self) -> AxisOrigin:
        """ Axis origin used to compute the coordinates. """
        return self._axis_origin

    @axis_origin.setter
    def axis_origin(self, ax: AxisOrigin):
        self._axis_origin = ax

    @property
    def id(self) -> int:
        """ Identifier """
        return self._id

    @property
    def x1(self) -> float:
        """ First x coordinate """
        return min(self._transform_x(self._x1), self._transform_x(self._x2))

    @property
    def y1(self) -> float:
        """ First y coordinate """
        return min(self._transform_y(self._y1), self._transform_y(self._y2))

    @property
    def x2(self) -> float:
        """ Second x coordinate """
        return max(self._transform_x(self._x1), self._transform_x(self._x2))

    @property
    def y2(self) -> float:
        """ Second y coordinate """
        return max(self._transform_y(self._y1), self._transform_y(self._y2))

    @property
    def coordinates(self):
        """ All coordinates """
        return self.x1, self.y1, self.x2, self.y2

    def _transform_x(self, x: float) -> float:
        """
        Transforms an x coordinate considering the established axis origin and screen width.
        Args:
            x: original coordinate
        Returns:
            transform coordinate
        """
        # transform origin
        x_t = x * self._SCREEN_WIDTH
        width_t = max(self._vp_w, self._SCREEN_WIDTH)
        x_t = abs(self._axis_origin.value[0] * width_t - x_t)

        # normalize coordinates if necessary
        if self._normalized_coord:
            x_t /= self._SCREEN_WIDTH

        return x_t

    def _transform_y(self, y: float) -> float:
        """
        Transforms an y coordinate considering the established axis origin and screen width.
        Args:
            y: original coordinate
        Returns:
            transform coordinate
        """
        # transform origin
        y_t = y * self._SCREEN_HEIGHT
        height_t = max(self._vp_h, self._SCREEN_HEIGHT)
        y_t = abs(self._axis_origin.value[1] * height_t - y_t)

        # normalize coordinates if necessary
        if self._normalized_coord:
            y_t /= self._SCREEN_HEIGHT

        return y_t
