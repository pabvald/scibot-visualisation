from typing import List, Tuple, Dict
from marshmallow import Schema, fields
from pandas.core.frame import DataFrame

from src.features import FixationEvent, SaccadeEvent
from .bounding_box import BoundingBoxMixin
from .label import Label, LabelLayoutSchema, LabelFixDurationSchema


class Paragraph(BoundingBoxMixin):
    """ Paragraph  representation """

    def __init__(self, par_id: int, doc_id: str, x1: float = 0, y1: float = 0, x2: float = 0, y2: float = 0,
                 system_rel: float = False, perceived_rel: float = False, pred_rel: Tuple[float, bool] = [False, -1],
                 features: Dict = None, gaze_data: DataFrame = None):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            x1: first x coordinate
            y1: first y coordinate
            x2: second x coordinate
            y2: second y coordinate
        """
        self._id = par_id
        self._doc_id = doc_id
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2
        self._system_relevance = system_rel
        self._perceived_relevance = perceived_rel
        self._pred_relevance = pred_rel
        if features is None:
            self._features = {}
        else:
            self._features = features
        self._gaze_data = gaze_data
        self._labels = []

    @classmethod
    def from_layout(cls, par_id: int, doc_id: str, par_layout: DataFrame, labels_layout: DataFrame):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            par_layout: paragraph's layout
            labels_layout: labels' layout
        Returns:
             a paragraph
        """
        _, x1, y1, x2, y2 = par_layout
        paragraph = Paragraph(par_id=par_id, doc_id=doc_id, x1=x1, y1=y1, x2=x2, y2=y2)

        # create  labels
        for label_id, label_layout in labels_layout.iterrows():
            label = Label.from_layout(label_id=label_id, doc_id=doc_id, layout=label_layout)
            paragraph.add_label(label)

        return paragraph

    @classmethod
    def from_layout_gaze(cls, par_id: int, doc_id: str, par_layout: DataFrame, labels_layout: DataFrame,
                         gaze_data: DataFrame):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            par_layout: paragraph's layout
            labels_layout: labels' layout
            gaze_data: paragraph's gaze data
        Returns:
             a paragraph
        """
        _, x1, y1, x2, y2 = par_layout
        paragraph = Paragraph(par_id=par_id, doc_id=doc_id, x1=x1, y1=y1, x2=x2, y2=y2,
                              gaze_data=gaze_data)

        # create  labels
        for label_id, label_layout in labels_layout.iterrows():
            label = Label.from_layout(label_id=label_id, doc_id=doc_id, layout=label_layout)
            paragraph.add_label(label)

        return paragraph

    @classmethod
    def from_relevance(cls, par_id: int, doc_id: str, system_rel: float, perceived_rel: float,
                       pred_rel: Tuple[float, bool]):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            system_rel: paragraph's system relevance
            perceived_rel: paragraph's perceived relevance
            pred_rel: paragraph's predicted relevance
        Returns:
             a paragraph
        """
        paragraph = Paragraph(par_id=par_id, doc_id=doc_id, system_rel=system_rel, perceived_rel=perceived_rel,
                              pred_rel=pred_rel)

        return paragraph

    @classmethod
    def from_features(cls, par_id: int, doc_id: str, features: Dict):
        """
        Args:
            par_id: paragraph's id
            doc_id: document's id
            features: paragraph's features
        Returns:
             a paragraph
        """
        paragraph = Paragraph(par_id=par_id, doc_id=doc_id, features=features)

        return paragraph

    @property
    def id(self):
        """ The id of the paragraph """
        return self._id

    @property
    def labels(self) -> List[Label]:
        """ Labels contained in the paragraph """
        return self._labels

    @property
    def system_relevance(self) -> bool:
        """ The paragraph is labeled as 'relevant' """
        return self._system_relevance

    @property
    def perceived_relevance(self) -> bool:
        """ The paragraph is perceived as 'relevant' by the user """
        return self._perceived_relevance

    @property
    def pred_relevance(self) -> Tuple[float, bool]:
        """ Predicted relevance based on the paragraph's features """
        return self._pred_relevance

    @property
    def features(self) -> Dict:
        """ Precomputed features """
        return self._features

    @property
    def gaze_data(self) -> DataFrame:
        """ Gaze data """
        return self._gaze_data

    @property
    def fixations(self) -> List[FixationEvent]:
        """ Get the fixation events within this paragraph """
        if self._gaze_data is not None:
            return FixationEvent.from_dataframe(self.gaze_data)
        else:
            return []

    @property
    def saccades(self) -> List[SaccadeEvent]:
        """ Get the saccade events within this paragraph """
        if self._gaze_data is not None:
            return SaccadeEvent.from_fixations(self.fixations)
        else:
            return []

    def add_label(self, label: Label):
        """ Add a new label.
        Args:
            label: new label
        """
        self._labels.append(label)


"""
Marshmallow Schemas
"""


class ParagraphLayoutSchema(Schema):
    id = fields.Integer()
    x1 = fields.Float()
    y1 = fields.Float()
    x2 = fields.Float()
    y2 = fields.Float()
    labels = fields.List(fields.Nested(LabelLayoutSchema))


class ParagraphFeaturesSchema(Schema):
    id = fields.Integer()
    features = fields.Dict()


class ParagraphFixDurationSchema(Schema):
    id = fields.Integer()
    labels = fields.List(fields.Nested(LabelFixDurationSchema))


class ParagraphRelevanceSchema(Schema):
    id = fields.Integer()
    system_relevance = fields.Boolean(data_key="systemRelevance")
    perceived_relevance = fields.Boolean(data_key="perceivedRelevance")
    pred_relevance = fields.Tuple((fields.Float(), fields.Boolean()),
                                  data_key="predictedRelevance")
