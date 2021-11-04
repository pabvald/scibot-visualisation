from marshmallow import Schema, fields


class DocumentModel(object):
    """ Document Representation """

    def __init__(self, user_id: str, doc_id: str, query: str):
        """
        Args:
            user_id: the user's id
            doc_id: the document's id (filename without the .html extension)
            query: the query of the document
        """
        self._user_id = user_id
        self._id = doc_id
        self._query = query

    @property
    def id(self) -> str:
        """ Document id or filename """
        return self._id

    @property
    def user_id(self) -> str:
        """ User id"""
        return self._user_id

    @property
    def query(self) -> str:
        """ Query that the user had to look an answer for """
        return self._query


class DocumentSchema(Schema):
    user_id = fields.Str(data_key="userId")
    id = fields.Str()
    query = fields.Str()
