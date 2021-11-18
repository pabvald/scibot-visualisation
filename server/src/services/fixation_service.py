from features import HorizontalFixationArea
from models import Document, AxisOrigin


class FixationService(object):

    def __init__(self):
        pass

    @staticmethod
    def compute_horizontal_hits(document: Document, left_margin: int, right_margin: int):
        """
        Computes the fixation time on every label of a document considering an horizontal
        fixation area.
        Args:
            document: a document.
            left_margin: the left margin of the horizontal fixation area in number of letters.
            right_margin: the right margin of the horizontal fixation area in number of letters.
        """
        for paragraph in document.paragraphs:
            # consider only the gaze points assign to each paragraph !!!
            for fixation in paragraph.fixations:
                # create fixation area from fixation
                fixation_area = HorizontalFixationArea(fixation=fixation, left_margin=left_margin,
                                                       right_margin=right_margin)

                # check which labels in the paragraph are hit
                i = 0
                line_hit = False
                possible_hits = True

                while i < len(paragraph.labels) and possible_hits:
                    label = paragraph.labels[i]

                    # modify coordinates (scale, origin) to match gaze data
                    label.normalized_coord = False
                    label.axis_origin = AxisOrigin.BL

                    if fixation_area.hits(label):
                        label.add_fix_duration(fixation.duration)
                        line_hit = True
                    elif line_hit:  # no more hits are possible in the next lines
                        possible_hits = False

                    # reset coordinates to original state
                    label.normalized_coord = True
                    label.axis_origin = AxisOrigin.TL

                    i += 1
