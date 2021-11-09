# Models 

## Serialization - Marshmallow

For serialization, we use the Python library [marshmallow](https://marshmallow.readthedocs.io/en/stable/), for
simplified object serialization. In short, marshmallow schemas can be used to:

 + Validate input data.

 + Deserialize input data to app-level objects.

 + Serialize app-level objects to primitive Python types. In our case, the serialized objects are
then rendered in JSON format.

For each Model, a marshmallow Schema is defined. Both the Model and the corresponding Schema
are defined in the same source file.

## Models 

### corpus.py
Contains the class enum `Corpus` to identify the two different sets of documents.

### layout.py
Contains the definition of hte class `LayoutModel`, which encapsulates attributes and behaviour 
related to the layout (bounding box) of a token/paragraph.

### document package

### label package 

### paragraph package

