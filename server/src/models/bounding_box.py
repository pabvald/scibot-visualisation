from enum import Enum


class AxisOrigin(Enum):
    BL = (0, 0)
    BR = (1, 0)
    TL = (0, 1)
    TR = (1, 1)


class BoundingBox(object):
    """ Bounding Box Mixin"""

    _SCREEN_WIDTH = 2560
    _SCREEN_HEIGHT = 1440
    _VIEWPORT_SIZE = {
        "nq_5p_a0_LTcw": {"width": 2560, "height": 2967},
        "nq_5p_a0_LTIz": {"width": 2560, "height": 3073},
        "nq_5p_a2_MTgz": {"width": 2560, "height": 2596},
        "nq_5p_a3_LTYx": {"width": 2560, "height": 2967},
        "nq_5p_a4_LTI3": {"width": 2560, "height": 2490},
        "nq_6p_a1_LTEy": {"width": 2560, "height": 2510},
        "nq_6p_a3_MzA5": {"width": 2560, "height": 3040},
        "nq_6p_a4_ODQz": {"width": 2560, "height": 3252},
        "nq_6p_a5_LTkw": {"width": 2560, "height": 2987},
        "nq_7p_a1_Mzgy": {"width": 2560, "height": 3272},
        "nq_7p_a2_LTYz": {"width": 2560, "height": 3484},
        "nq_7p_a5_NTE0": {"width": 2560, "height": 3590},
        "g-rel_q075-1_i": {"width": 2560, "height": 1137},
        "g-rel_q076-1_r": {"width": 2560, "height": 1369},
        "g-rel_q128-1_r": {"width": 2560, "height": 1263},
        "g-rel_q085-2_i": {"width": 2560, "height": 1190},
        "g-rel_q094-2_t": {"width": 2560, "height": 1243},
        "g-rel_q097-2_t": {"width": 2560, "height": 1308},
        "g-rel_q103-1_i": {"width": 2560, "height": 1190},
        "g-rel_q116-1_r": {"width": 2560, "height": 1230},
        "g-rel_q118-1_r": {"width": 2560, "height": 1190},
        "g-rel_q122-2_i": {"width": 2560, "height": 1402},
        "g-rel_q134-3_t": {"width": 2560, "height": 1296},
        "g-rel_q088-1_t": {"width": 2560, "height": 1263}
    }

    _normalized_coord = True
    _axis_origin = AxisOrigin.TL

    @property
    def vp_w(self) -> float:
        return self._VIEWPORT_SIZE[self._doc_id]['width']

    @property
    def vp_h(self) -> float:
        return self._VIEWPORT_SIZE[self._doc_id]['height']

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
        width_t = max(self.vp_w, self._SCREEN_WIDTH)
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
        height_t = max(self.vp_h, self._SCREEN_HEIGHT)
        y_t = abs(self._axis_origin.value[1] * height_t - y_t)

        # normalize coordinates if necessary
        if self._normalized_coord:
            y_t /= self._SCREEN_HEIGHT

        return y_t
