
from models import DocumentModel, ParagraphModel, LabelModel
from features import HorizontalFixationArea


class FixationService(object):

    def __init__(self):
        pass

    @staticmethod
    def compute_horizontal_hits(document: DocumentModel, left_margin: int, right_margin: int):
        """
        Computes the fixation on every label of a document considering an horizontal
        fixation area.
        Args:
            document: a document.
            left_margin: the left margin of the horizontal fixation area in number of letters.
            right_margin: the right margin of the horizontal fixation area in number of letters.
        """
        for paragraph in document.paragraphs:
            for fixation in paragraph.fixations:
                # create fixation area from fixation
                fixation_area = HorizontalFixationArea(fixation=fixation, left_margin=left_margin,
                                                       right_margin=right_margin)

                # check which labels of are hit
                line_hit = False
                no_more_hits = False
                for label in paragraph.labels:
                    label.normalized_coord = False
                    if fixation_area.hits(*label.coordinates):
                        label.add_fixation(fixation)
                        line_hit = True
                    elif line_hit:
                        no_more_hits = True
                    label.normalized_coord = True

                    if no_more_hits:
                        break

