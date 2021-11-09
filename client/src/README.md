# Overview

## app
Contains thte Typescript, HTML and SCSS code that constitutes the Angular application. Check the inner `README` for more details.

## assets


## environments 
A project's `src/environments/` folder contains the base configuration file, `environment.ts`, which provides a default environment. You can add override defaults for additional environments, such as production and staging, in target-specific configuration files. For more details, check the Angular documentation on [Building and serving Angular apps](https://angular.io/guide/build).

Currently, only a production environment, `enviroment.prod.ts`, is defined. The production 
environment specifies a different API URL from the one corresponding to the `localhost`. 

## favicon.ico 
Corresponds to DFKI's logo.

## styles.scss 
The global styles as well as sytle-related constants (e.g. color palette) should be defined in this file. 

In order to import the `styles.scss` and 
get access to the variables defined in it within a particular component's style file, you can include the following import statement:

```css 
@import './<relative path>/styles.scss';
```
