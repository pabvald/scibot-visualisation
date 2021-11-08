# Angular client

## Set up for development 

### Installation 
First, download and install Node.js, version **14.17.5**, from [node.org](https://nodejs.org/en/download/). Make sure that node has been correctly installed by running in a terminal window the command  `node -v`.

Second, install the required packages: 
```
npm install
```

Finally, install the Angular CLI using the **npm package manager**. To check that you have the npm client installed, run `npm -v` in a terminal window. To install the Angular CLI run
```
npm install -g @angular/cli@12.2.2
```

Notice that we are installing a particular version of Angular CLI, i.e. **12.2.2**.

### Development server
Run the following command
```
ng serve 
```
and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the 
source files.

Alternatively, you can run
```
ng serve --open
```
and a browser tab will automatically be opened.

### Build

Run the following commands: 
```
ng build --build-optimizer --base-href / --deploy-url /static/ --configuration=development
```

The build artifacts will be stored in the `dist/client` folder. The `index.html` have to 
be copied to the `../server/templates` folder. The rest of the files have to be copied into the 
`../server/static` folder.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Set up for production 

### Build

Run the following commands: 
```
ng build --build-optimizer --base-href / --deploy-url /static/ --configuration=production
```

The build artifacts will be stored in the `dist/client` folder. The `index.html` have to 
be copied to the `../server/templates` folder. The rest of the files have to be copied into the 
`../server/static` folder.
