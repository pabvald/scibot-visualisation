from marshmallow import Schema, fields


class ParagraphModel(object):
    """ Paragraph representation """

    def __init__(self, par_id: int):
        """
        Args:
            par_id: paragraph's id
        """
        self._id = par_id

    @property
    def id(self):
        """ The id of the paragraph """
        return self._id


class ParagraphSchema(Schema):
    id = fields.Integer()
