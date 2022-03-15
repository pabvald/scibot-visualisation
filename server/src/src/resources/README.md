# Resources 

## document package 

| File           | Resource                    | API call                                     | Implemented HTTP methods | Description                                            |
|----------------|-----------------------------|----------------------------------------------|--------------------------|--------------------------------------------------------|
| `list.py`      | `DocumentList`              | `/api/document/ids`                          | `GET`                    | List of all existing documents.                        |
| `layout.py`    | `DocumentLayoutResource`    | `/api/document/layout/<user_id>/<doc_id>`    | `GET`                    | Text + Layout of a certain document.                   |
| `features.py`  | `DocumentFeaturesResource`  | `/api/document/features/<user_id>/<doc_id>`  | `GET`                    | Paragraph features of a certain document.              |
| `relevance.py` | `DocumentRelevanceResource` | `/api/document/relevance/<user_id>/<doc_id>` | `GET`                    | Paragraph relevance assessments of a certain document. |
| `layout.py`    | `DocumentFixationResource`  | `/api/document/fixation/<user_id>/<doc_id>`  | `GET`                    | Fixation times per token of a certain document.        |

## user package 

| File      | Resource   |     API call    | Implemented HTTP methods | Description                 |
|-----------|------------|-----------------|--------------------------|-----------------------------|
| `list.py` | `UserList` | `/api/user/ids` | `GET`                    | List of all existing users. |