from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data_loading import ArticleLoader
from models import ArticleSchema


app = Flask(__name__)
CORS(app)  # allow CORS


@app.route('/article/<corpus>/<article_id>', methods=['GET'])
def article(corpus: str, article_id: str):
    """
    Get a certain article.

    Args:
        corpus: g-REL or Google_NQ
        article_id: id of the article
    """
    loaded_article = ArticleLoader().load_article(corpus, article_id)
    serialized_article = ArticleSchema().dump(loaded_article)
    return jsonify(serialized_article)


if __name__ == '__main__':
     app.run(port=5002, debug=True)