from typing import List
from marshmallow import fields
from pandas.core.frame import DataFrame

from features import FixationEvent, SaccadeEvent
from models.corpus import Corpus
from models.paragraph import ParagraphFixDurationModel, ParagraphFixDurationSchema

from .base import DocumentModel, DocumentSchema


class DocumentFixDurationModel(DocumentModel):
    """ Document + Fixation duration representation """

    def __init__(self, user_id: str, doc_id: str, corpus: Corpus, pars_layout: DataFrame, labels_layout: DataFrame,
                 gaze_data: DataFrame):
        """
        Args:
            user_id: user's id
            doc_id: document's id (filename without the .html extension)
            corpus: Corpus.grel or Corpus.nq
            pars_layout: layout of the paragraphs
            labels_layout: layout of the labels
            gaze_data: gaze data of the document
        """
        super().__init__(user_id, doc_id, corpus)

        # create the paragraphs
        par_ids = pars_layout['paragraph_id'].to_numpy()
        for par_id in par_ids:
            par_gaze = gaze_data.loc[gaze_data['paragraph_id'] == par_id]
            par_layout = list(pars_layout.loc[pars_layout['paragraph_id'] == par_id].to_numpy()[0])
            labels_selection = labels_layout.loc[labels_layout['paragraph_id'] == par_id]

            self._add_paragraph(
                ParagraphFixDurationModel(doc_id=doc_id, par_id=par_id, par_layout=par_layout,
                                          labels_layout=labels_selection, gaze_data=par_gaze)
            )

    @property
    def fixations(self) -> List[FixationEvent]:
        """ All fixation events of the document """
        pars_fixations = [par.fixations for par in self._paragraphs]
        return sum(pars_fixations, [])

    @property
    def saccades(self) -> List[SaccadeEvent]:
        """ All saccade events of the document """
        pars_saccades = [par.saccades for par in self._paragraphs]
        return sum(pars_saccades, [])


class DocumentFixDurationSchema(DocumentSchema):
    paragraphs = fields.List(fields.Nested(ParagraphFixDurationSchema))
