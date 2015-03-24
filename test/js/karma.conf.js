module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../..',
        reporters: ['progress'],
        colors: true,
        frameworks: ['jasmine'],
        files: [
            'src/js/api/*.js',
            'src/js/modules/*.js',
            'spec/**/*.js'
        ],
        exclude: [
            'src/test/js/karma.conf.js',
            'spec/api_spec.js',
            'spec/routes_spec.js',
            'src/js/modules/template.js'
        ],
        // web server port
        port: 9876,
        // possible values: LOG_DISABLE|ERROR|WARN|INFO|DEBUG
        logLevel: config.LOG_INFO
    });
};