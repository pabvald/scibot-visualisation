
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
            # consider only the gaze points assign to each paragraph
            for fixation in paragraph.fixations:
                # create fixation area from fixation
                fixation_area = HorizontalFixationArea(fixation=fixation, left_margin=left_margin, right_margin=right_margin)

                # check which labels of are hit
                i = 0
                line_hit = False
                possible_hits = True

                while i < len(paragraph.labels) and possible_hits:
                    label = paragraph.labels[i]
                    label.normalized_coord = False
                    if fixation_area.hits(*label.coordinates):
                        label.add_fixation(fixation)
                        line_hit = True
                    elif line_hit:  # no more hits are possible in the next lines
                        possible_hits = False
                    label.normalized_coord = True
                    i += 1

