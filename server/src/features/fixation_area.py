import abc

from typing import List

from .fixation_event import FixationEvent


class FixationArea(metaclass=abc.ABCMeta):

    @staticmethod
    @abc.abstractmethod
    def from_fixations(self, fixations: List[FixationEvent]):
        pass

    @abc.abstractmethod
    def hits(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        pass


class HorizontalFixationArea(FixationArea):

    _PIXELS_PER_LETTER = 20  # pixels of that a letter occupies in the screen of the study

    def __init__(self, fixation: FixationEvent, left_margin: int = 8, right_margin: int = 14, mode: str = "covers"):
        """
        Args:
            fixation: the fixation event from which the fixation area is created
            left_margin: the left margin in LETTERs of the horizontal fixation area
            right_margin: the right margin in LETTERs of the horizontal fixation area
            mode: determines if a bounding box is considered as fixated when it is covered by the fixation area
            ('covers') or simply intersected ('intersects').
        """
        assert left_margin >= 0, "the left margin is negative"
        assert right_margin >= 0, "the right margin is negative"
        assert mode in ["intersects", "covers"], "invalid label mode"

        self._fixation = fixation
        self._left_margin = left_margin
        self._right_margin = right_margin
        self._mode = mode

    @staticmethod
    def from_fixations(self, fixations: List[FixationEvent]):
        fixation_areas = []
        for fix in fixations:
            fixation_areas.append(HorizontalFixationArea(fixation=fix))

        return fixation_areas

    @property
    def x1(self) -> float:
        return self._fixation.gaze_x - (self._PIXELS_PER_LETTER * self._left_margin)

    @property
    def x2(self) -> float:
        return self._fixation.gaze_x + (self._PIXELS_PER_LETTER * self._right_margin)

    @property
    def y(self) -> float:
        return self._fixation.gaze_y_stimulus

    @property
    def fixation(self) -> FixationEvent:
        return self._fixation

    @property
    def mode(self) -> str:
        return self._mode

    @mode.setter
    def mode(self, m: str):
        assert m in ["intersects", "covers"], "invalid label mode"
        self._mode = m

    def hits(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        """
        Determines if a label is hit by the fixation area.

        Args:
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
        """
        if self._mode == "covers":
            hits_w = self._covers_w(x1, y1, x2, y2)
            hits_h = self._covers_h(x1, y1, x2, y2)

        else:
            hits_w = self._intersects_w(x1, y1, x2, y2)
            hits_h = self._intersects_h(x1, y1, x2, y2)

        return hits_w and hits_h

    def _covers_h(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        """  The hit area covers the height """
        return self._intersects_h(x1, y1, x2, y2)

    def _covers_w(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        """ The hit area covers the width """
        return self.x1 <= min(x1, x2) and self.x2 >= max(x1, x2)

    def _intersects_h(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        """  The hit area intersects the height """
        return min(y1, y2) <= self.y <= max(y1, y2)

    def _intersects_w(self, x1: float, y1: float, x2: float, y2: float) -> bool:
        """ The hit are intersects the width """
        return self.x1 <= max(x1, x2) or self.x2 >= min(x1, x2)

    def __str__(self):
        return "HorizontalHitArea(x1 = {}, x2 = {}, y = {})".format(self.x1, self.x2, self.y)

