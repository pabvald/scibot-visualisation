# Overview


## App initialization 
The App initialization is made in `app.py`:
```python 
import Flask 

app = Flask(__name__)
```

## Configuration 
The configuration of the Flask application is defined providing a configuration object, which is
defined in `config.py`. You can check [this page](https://flask.palletsprojects.com/en/2.0.x/config/) of 
the Flask documentation for more information on all the possible ways in which a Flask application can be
configured.

To load a configuration object once the application has been initialized: 
```python 
app.config.from_object('config.ConfigurationObject')  
```

### Basic configuration
There is a basic configuration object `Config` that is used for development and specifies the 
versions of the dataset to be used and the paths of the different datasets.

### Production configuration
A second production configuration object `ProductionConfig` that disables the debugging.


## API definition 
To build the API, we make use of [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/),
an extension for Flask that adds support for quickly building REST APIs. Up to this point, the 
API only allows to retrieve data, but allows neither modifications nor deletions of the data.

The API initialization 
```python
api = Api(app)
```

and the definition of the API calls are made in `app.py`. Each API call definition establishes a
correspondence between a URL and a *resource*, the main building block provided by
Flask-RESTful.

Example of an API call definition: 

```python 
api.add_resource(UserListResource, '/api/user/ids')
```
Check the `README` in the `resources` package for a specification of the correspondence between 
API calls and resources. 

For more details, check the documentation of the Flask-RESTful extension on 
[resourceful routing](https://flask-restful.readthedocs.io/en/latest/quickstart.html#resourceful-routing).


## Serve static content 
The artifacts generated with the building of the Angular client (frontend) are stored in `static`, 
with the exception of `index.html`, which is included in the folder `templates`.

The route 
```python 
@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')
```
in `app.py` serves the frontend files.

## Error definition

The file `errors.py` currently contains only a few error messages. It is intended to also include
the definition of custom errors when necessary. Check the Flask documentation on [handling application errors](https://flask.palletsprojects.com/en/2.0.x/errorhandling/)
for more information.



