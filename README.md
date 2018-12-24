# Frontend

Custom JS and CSS frontend for inclusion in [Canvas](http://www.instructure.com/).

# Description

The custom JS and CSS frontend is built on top of Canvas using the mechanism in Canvas for including custom .js and .css files.

The frontend changes the Canvas graphical design and user interface by using [LESS](http://lesscss.org) and custom HTML injected using JavaScript and [Handlebars.js](http://handlebarsjs.com/) templates.

The custom JS and CSS frontend is compiled and concatenated into a single CSS and JavaScript file using Node and [Grunt - JavaScript Task Runner](http://gruntjs.com)

# Getting started

If you want to to build the frontend on your local machine you need to follow the steps below. Note that some of the commands might require sudo on certain systems.

## Install Node

To build CSS and JavaScript files you need to install [Node JS](http://nodejs.org) or update to the latest version if you are already have it installed.

## Clone or download frontend project to local machine

Clone the frontend from https://github.com/matematikk-mooc/frontend or download using your browser:

```
git clone https://github.com/matematikk-mooc/frontend.git
```

## Install Grunt and build dependencies (Node packages)

Switch to the directory where the frontend is located and install the dependencies using [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) or [NPM](https://www.npmjs.com/).

```
yarn
```

or

```
npm install
```

## Compile JS and CSS files

Compile JS and CSS files using [GRUNT](http://gruntjs.com/)

```
grunt
```

The resulting JS and CSS file can then be found in the **dist** directory

## Start a web server on your local machine

If you want to serve the CSS and JS files on your local machine for development, you can do this using Grunt:

```
grunt serve
```

All changes in LESS (CSS) and JavaScript will automatically be compiled and are available using the following URLs:

- [http://localhost:9000/mmooc-min-dev.css](http://localhost:9000/mmooc-min-dev.css) (for development)
- [http://localhost:9000/mmooc-min.css](http://localhost:9000/mmooc-min.css) (for production)
- [http://localhost:9000/mmooc-min.js](http://localhost:9000/mmooc-min.js)
- [http://localhost:9000/badges-dev.js](http://localhost:9000/badges-dev.js) (for dev)
- [http://localhost:9000/badgesafe.js](http://localhost:9000/badgesafe.js) (for prod)
- [http://localhost:9000/badgesafe.css](http://localhost:9000/badgesafe.css)

## Run Jasmine JavaScript tests

```
grunt test
```

## Visual regression tests

### Visual regression tests stack

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Jest](https://github.com/facebook/jest)
- [Jest Image Snapshot](https://github.com/americanexpress/jest-image-snapshot#readme)

those modules are automatically installed when you install the application, please refer to the 'Getting started' section

### File structure

| Directories                       | Description                                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| puppeteer                         | main directory with test files, and folders with image snapshots and diffs |
| puppeteer/\_\_image_snapshots\_\_ | directory with snapshots                                                   |
|                                   |                                                                            |

| Files             | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| test-env-setup.js | stores login credentials and test environment configuration, as well as consts used in test |
| jest-setup.js     | stores jest setup                                                                           |
|                   |                                                                                             |

### Configuration of the test environment

It is necessary to add login credentials to the test-env-setup.js file. Initially, the file should look like this:

```javascript
global.EMAIL = 'udir-team@netguru.co';
global.PASSWORD = '';

global.IS_HEADLESS = true;
global.URL = 'http://udir.staging.devguru.co';

global.VIEWPORT_SIZE = {
  width: 1440,
  height: 900
};

global.SELECTORS = {
  USERNAME_SELECTOR: '#pseudonym_session_unique_id',
  PASSWORD_SELECTOR: '#pseudonym_session_password',
  CHECKBOX_SELECTOR: '#pseudonym_session_remember_me',
  BUTTON_SELECTOR: '.Button--login'
};

global.JEST_IMAGE_CONFIG = {
  failureThreshold: '0.05',
  failureThresholdType: 'percent'
};
```

Add the values to the EMAIL and PASSWORD variables. Here is the example:

```javascript
global.EMAIL = 'john.smith@gmail.com';
global.PASSWORD = 'password123';
```

If you would like to test the app on a different address, please modify this line: `global.URL = 'http://udir.staging.devguru.co';`

### Good practices

#### Keeping the stable testing environment

The visual regression tests will detect minor differences between the image snapshot reference and the tested screen. Thus, editing a single module or a course syllabus will cause certain tests to fail. Therefore, it is suggested to keep one course and one user account purely for testing.

It does not mean you are not allowed to edit this course or account preferences. It just means you will have to update the image snapshot references after introducing any changes. The procedure is described below.

### Running visual regression tests

- when you run the tests for the first time, please make sure you add the login credentials to the test-env-setup.js file, which you can find in the root directory, make sure the EMAIL, PASSWORD and URL variables have correct values
- in order to run the tests use the script `yarn test:regression` (or `npm run test:regression` if you use npm)
- if the tests run for the first time, the snapshots will be created in the `puppeteer/__image_snapshots__` directory
- if any of the tests fail. you can check the difference in the `puppeteer/__image_snapshots__/__diff_output__` folder
- if the difference is unwanted, you shall attempt to remove the issue, and run the tests again `yarn test:regression`
- if the difference is a result of a willful modification (eg adding a new element or changing the style), then you shall accept the changes by running `yarn test:regression:update` (or `npm run test:regression:update` if you use npm)

#### Additional scripts

there is quite a lot of screens in the app, thus additional scripts have been created to test only some parts of the app:

- `yarn test:regression:course` tests screens associated with courses
- `yarn test:regression:user` tests user account screens

### Known issues

- sometimes page loads slower or freezes, what causes timeout errors - then the test shall be run again
- it might also happen that the test fails due to the difference caused by the fact that not all elements loaded before the image snapshot was taken - then the test shall be run again
- if you add too many assertions to one test suite, you might encounter a timeout issue - while adding new tests keep that in mind
- the test script is set to run tests sequentially in order to avoid timeout issues `"test:regression": "jest --runInBand"` thus if you prefer to use jest cli commands instead of the script itself, make sure you use such command: `yarn jest --runInBand`
- references made in headless mode differ from the ones made in headless mode switched off - if you change the mode it is a good idea to update the references as well. you can change the mode in the test-env-setup.js file in this line of code `global.IS_HEADLESS = true;`

# Project structure

## Directories

| Directory     | Description                               |
| ------------- | ----------------------------------------- |
| spec          | Jasmine JavaScript tests                  |
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

# Deployment

Copy all files from the dist directory to your web server.
Note that addons generate different files that may be destinated to different directories in your production server.

## Image paths

The CSS files have URL references to bitmaps which are replaced at build time using grunt-text-replace. To change the URL for the production server,
modify the following section in Gruntfile.js

```
    replacements: [{
	    from: 'https://server',
		to: 'https://apps.kantega.no/mmooc'
    }]
```
