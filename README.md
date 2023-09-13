# Frontend

Custom JS and CSS frontend for inclusion in [Canvas](http://www.instructure.com/).

# Description

The custom JS and CSS frontend is built on top of Canvas using the mechanism in Canvas for including custom .js and .css files.

The frontend changes the Canvas graphical design and user interface by using [LESS](http://lesscss.org) and custom HTML injected using JavaScript and [Handlebars.js](http://handlebarsjs.com/) templates.

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

Switch to the directory where the frontend is located and install the dependencies using [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) or [NPM](https://www.npmjs.com/).

```
yarn
```

or

```
npm install
```


## Start a web server on your local machine

If you want to serve the CSS and JS files on your local machine for development, you can do this using Webpack DevServer:

```
npm run buildDevelopment
npm run serveDevelopment
```

All changes in LESS (CSS) and JavaScript will automatically be compiled and are available using the following URLs:

- [http://localhost:9000/subaccount-localhost.css](http://localhost:9000/subaccount-localhost.css)
- [http://localhost:9000/rootaccount-localhost.css](http://localhost:9000/rootaccount-localhost.css)
- [http://localhost:9000/subaccount-localhost.js](http://localhost:9000/subaccount-localhost.js)
- [http://localhost:9000/rootaccount-localhost.js](http://localhost:9000/rootaccount-localhost.js)
- [http://localhost:9000/kompetanseportalen-localhost.js](http://localhost:9000/kompetanseportalen-localhost.js)
- [http://localhost:9000/badges-dev.js](http://localhost:9000/badges-dev.js)
- [http://localhost:9000/badges-dev.css](http://localhost:9000/badges-dev.css)

## Build JS and CSS files for staging and production environment

Compile JS and CSS for the staging environment using

```
npm run buildStaging
```
Compile JS and CSS for the production environment using

```
npm run buildProduction
```

* See scripts section in package.json

The resulting JS and CSS file can be found in the **dist** directory. These commands will get the timestamp of the latest commit to the given branch, and append to the filenames.
To test code locally allways use buildDevelopment and serveDevelopment, as buildStaging and buildProduction will use the file already uploaded to Azure, and will not pick up local changes.

# Project structure

## Directories

| Directory     | Description                               |
| ------------- | ----------------------------------------- |
|~~spec~~       | ~~Jasmine JavaScript tests~~              |
| src           | Source code                               |
| src/addons    | modules for canvas addons                 |
| src/css       | CSS(LESS)                                 |
| src/js        | JavaScript                                |
| src/templates | Handlebars.js templates for creating HTML |
| dist/         | Build output directory                    |

## src/css

| Directory | Description                                     |
| --------- | ----------------------------------------------- |
| framework | CSS for override of global Canvas HTML elements |
| modules   | CSS for custom HTML modules added to canvas     |
| pages     | CSS overrides for specific Canvas pages         |
| setup     | Global LESS variables, mixins, custom font      |

## src/js

| File              | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| main.js           | Calls different JS functions to create custom HTML based on URL (routes) |
| api/api.js        | Call to Canvas REST API etc                                              |
| modules/          | Various JavaScripts called from main.js                                  |
| modules/routes.js | Library used to call different JS functions based on URLs using RegExps  |

## Webpack config files

| File                          | Description                                 |
| ------------------------------|---------------------------------------------|
| webpack.development.config.js | Config file for development                 |
| webpack.production.config.js  | Config file for production environment      |
| webpack.staging.config.js     | Config file for staging environment         |


# Deployment

Copy all files from the dist directory to your web server.
Note that addons generate different files that may be destinated to different directories in your production server.

## Workflow

**.github** containts Github Actions pipelines for building staging and production and pushing **dist** directory to Azure.

# Environment specific variables
## LESS Image paths

The LESS files have URL references to bitmaps which are replaced at build time using globalVars in [Webpack less-loader](https://webpack.js.org/loaders/less-loader/). To change the URL for the server,
modify the following section in webpack.(production|staging|development).config.js

```
module: {
  rules: [
    ...
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          relativeUrls: false,
          globalVars: {
            SERVER: JSON.stringify('http://localhost:9000/'),
          },
        }
      }
    }
  ]
}
```

## JS variables
Some settings and urls differs between environment, these are replaced at build time using [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/) and can be updated in the following section in webpack.(production|staging|development).config.js

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

## Storybook
  npm run storybook
