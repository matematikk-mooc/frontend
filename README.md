# Frontend -

Custom JS and CSS frontend for inclusion in [Canvas](http://www.instructure.com/).

# Description

The custom JS and CSS frontend is built on top of Canvas using the mechanism in Canvas for including custom .js and .css files.

The frontend changes the Canvas graphical design and user interface by using [SCSS](https://sass-lang.com/) and custom HTML injected using JavaScript and [Vue](https://vuejs.org/) components.

The custom JS and CSS frontend is compiled and concatenated into a single CSS and JavaScript file using Node and [Webpack](https://webpack.js.org/)

# Getting started

If you want to to build the frontend on your local machine you need to follow the steps below. Note that some of the commands might require sudo on certain systems.

## Install Node

To build CSS and JavaScript files you need to install [Node JS](http://nodejs.org) or update to the latest version if you are already have it installed.

## Clone or download frontend project to local machine

Clone the frontend from https://github.com/matematikk-mooc/frontend or download using your browser:

```
git clone https://github.com/matematikk-mooc/frontend.git
```

## Install and build dependencies (Node packages)

Switch to the directory where the frontend is located and install the dependencies using [NPM](https://www.npmjs.com/).


```
yarn install
```


## Start a web server on your local machine

If you want to serve the CSS and JS files on your local machine for development, you can do this using Webpack DevServer:

```
yarn run build
yarn run watch
```

All changes in SCSS, Vue and Javascript will automatically be compiled and are available at [http://localhost:9000](http://localhost:9000/)


## Build JS and CSS files for stage and production environment
Compile JS and CSS for the stage environment using

```
yarn run stage
```


Compile JS and CSS for the production environment using

```
yarn run production
```


* See scripts section in package.json

The resulting JS and CSS file can be found in the **dist** directory. These commands will get the timestamp of the latest commit to the given branch, and append to the filenames.
To test code locally allways use "build" and "watch", as "stage" and "production" will use the file already uploaded to Azure, and will not pick up local changes.

# Project structure

## Directories

| Directory | Description |
| --- | --- |
| src | Source code |
| src/js | JavaScript files used to inject custom Vue components and hide unused Canvas elements. |
| src/vue | Custom Vue components and scss |
| dist/ | Build output directory |

## src/vue

| Directory | Description |
| --- | --- |
| /assets | Font files and svgs |
| /components | Custom Vue componets |
| /pages | Vue views used on urls where replacing the whole page |
| /design | SCSS files for own components and override styling of Canvas elements |
| /utils | util js files used with multilanguage |

## src/js

| File/Directory | Description |
| --- | --- |
| main.js | Calls different JS functions to create custom HTML based on URL (routes) |
| api/ | Call to Canvas REST API and KPAS API |
| modules/ | JavaScripts called from main.js |
| modules/routes.js | Library used to call different JS functions based on URLs using RegExps |

## Webpack config files

| File | Description |
| --- | --- |
| webpack.development.config.js | Config file for development (running with localhost) |
| webpack.stage.config.js | Config file for stage environment |
| webpack.production.config.js | Config file for production environment |


# Deployment

Copy all files from the dist directory to your web server.
Note that addons generate different files that may be destinated to different directories in your production server.

## Workflow

**.github** containts Github Actions pipelines for building dev and production and pushing **dist** directory to Azure.

# Environment specific variables

## JS variables
Some settings and urls differs between environment, these are replaced at build time using [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/) and can be updated in the following section in webpack.(production|dev|development).config.js

```
plugins: [
  ...
  new webpack.DefinePlugin({
    'DESIGNCSS' : JSON.stringify('subaccount-localhost.css'),
    'DESIGNJS' : JSON.stringify('kompetanseportalen-localhost.js'),
    'SERVER': JSON.stringify('http://localhost:9000/'),
    'KPASAPIURL': JSON.stringify('https://kpas.staging.kompetanse.udir.no/api'),
    'ACCOUNTID' : [99, 100, 102, 103, 137, 138, 139, 145],
    'KPAS_MERGE_LTI_ID' : 863,
    'KPAS_IFRAME_VERSION' : JSON.stringify('localhost'),
  })
]
```
