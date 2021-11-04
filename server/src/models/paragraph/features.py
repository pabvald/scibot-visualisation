from typing import Dict
from marshmallow import fields

from .base import ParagraphModel, ParagraphSchema


class ParagraphFeaturesModel(ParagraphModel):

    def __init__(self, par_id: int, features: Dict):
        super().__init__(par_id)
        self._features = features

    @property
    def features(self) -> Dict:
        """ Precomputed features """
        return self._features


class ParagraphFeaturesSchema(ParagraphSchema):
    features = fields.Dict()
