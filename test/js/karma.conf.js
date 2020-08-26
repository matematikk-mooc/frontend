module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../..',
        reporters: ['progress'],
        colors: true,
        frameworks: ['jasmine-jquery','jasmine'],
        files: [
            'node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/handlebars.js',
            'tmp/templates.js',
            'src/js/**/*.js',
            'src/addons/badges/js/*.js',
            'spec/**/*.js'
        ],
        exclude: [
            'src/js/3party/**/*.js',
            'src/js/main.js',
            'spec/api_spec.js',
            'src/addons/badges/js/main.js',
            'spec/routes_spec.js'
        ],
        // web server port
        port: 9876,
        // possible values: LOG_DISABLE|ERROR|WARN|INFO|DEBUG
        logLevel: config.LOG_INFO
    });
  };
