from abc import ABCMeta, abstractmethod


class BoundingBox(metaclass=ABCMeta):

    @property
    @abstractmethod
    def x1(self) -> float:
        pass

    @property
    @abstractmethod
    def x1(self) -> float:
        pass

    @property
    @abstractmethod
    def x2(self) -> float:
        pass

    @property
    @abstractmethod
    def y1(self) -> float:
        pass

    @property
    @abstractmethod
    def y2(self) -> float:
        pass