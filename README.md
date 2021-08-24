# Scibot visualization

## Set up for development 

### Flask Server

#### Installation 
First, create a Python virtual environment and activate it.

Second, install all the required packages: 
```
cd server
pip install -r requirements.txt
```

#### Run 
To run the development server, just execute the following commands: 
```
cd server/src
python app.py
```


### Angular client

#### Installation 
First, download and install Node.js, version **14.17.5**, from [node.org](https://nodejs.org/en/download/). Make sure that node has been correctly installed by running in a terminal window the command  `node -v`.

Second, install the Angular CLI using the **npm package manager**. To check that you have the npm client installed, run `npm -v` in a terminal window. To install the Angular CLI run
```
npm install -g @angular/cli@12.2.2
```

Notice that we are installing a particular version of Angular CLI, i.e. **12.2.2**.

#### Run
Run the following commands
```
cd client 
ng serve 
```
and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Alternatively, you can run
```
cd client 
ng serve --open
```
and a browser tab will automatically be opened.




