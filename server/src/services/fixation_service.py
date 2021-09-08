
from models import DocumentModel, ParagraphModel, LabelModel
from features import HorizontalFixationArea


class FixationService(object):

    def __init__(self):
        pass

    @staticmethod
    def compute_horizontal_hits(document: DocumentModel, left_margin: int, right_margin: int):
        """

        Args:
            document:
            left_margin:
            right_margin:
        """
        for paragraph in document.paragraphs:
            for fixation in paragraph.fixations:
                # create fixation area from fixation
                fixation_area = HorizontalFixationArea(fixation=fixation, left_margin=left_margin,
                                                       right_margin=right_margin)

                # check which labels of are hit
                for label in paragraph.labels:
                    label.normalized_coord = False
                    if fixation_area.hits(*label.coordinates):
                        label.add_fixation(fixation)
                    label.normalized_coord = True
