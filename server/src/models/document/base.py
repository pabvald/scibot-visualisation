from marshmallow import Schema, fields


class DocumentModel(object):
    """ Document Representation """
    def __init__(self, user_id: str, doc_id: str):
        """
        Args:
            user_id: the user's id
            doc_id: the document's id (filename without the .html extension)
        """
        self._user_id = user_id
        self._id = doc_id

    @property
    def id(self) -> str:
        """ Document id or filename """
        return self._id

    @property
    def user_id(self) -> str:
        """ User id"""
        return self._user_id


class DocumentSchema(Schema):
    user_id = fields.Str(data_key="userId")
    id = fields.Str()