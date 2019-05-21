'use strict';

module.exports = function (grunt) {
  // Helper function to load pre-defined grunt tasks
  require('load-grunt-tasks')(grunt);

  // Configures grunt tasks
  grunt.initConfig({
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['dist', 'tmp']
          }
        ]
      },
      // remove Javascript sourcemaps from production bundle
      release: ['dist/*.js.map'],
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'mmooc.templates',
          processName: function (filePath) {
            return filePath
              .replace('src/templates/modules/', '')
              .replace('src/addons/badges/templates/', '')
              .replace(/\.hbs$/, '');
          }
        },
        files: {
          'tmp/templates.js': ['src/templates/**/*.hbs'],
          'tmp/badges_template.js': ['src/addons/badges/templates/*.hbs']
        }
      }
    },

    less: {
      all: {
        options: {
          cleancss: true
        },
        files: {
          'tmp/mmooc-min.css': ['src/css/all.less'],
          'dist/badgesafe.css': ['src/addons/badges/css/all.less']
        }
      }
    },

    concat: {
      options: {
        sourceMap: true,
      },
      js: {
        src: [
          'src/js/3party/*.js',
          'tmp/templates.js',
          'src/js/api/*.js',
          'src/js/settingsRoot.js', 
          'src/js/utilRoot.js',
          'src/js/modules/*.js',
          'src/js/settings.js',
          'src/js/i18n.js',
          'src/js/main.js',
          'src/addons/canva_badges/js/*.js'
        ],
        dest: 'tmp/mmooc.js'
      },
      rootaccount: {
        src: ['src/js/settingsRoot.js', 'src/js/utilRoot.js', 'src/js/rootaccount.js'],
        dest: 'tmp/rootaccount.js'
      },      
      subaccount: {
        src: ['src/js/settingsRoot.js', 'src/js/utilRoot.js', 'src/js/subaccount.js'],
        dest: 'tmp/subaccount.js'
      },      
      extras: {
        src: [
          'node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/handlebars.min.js', // we need to embed handlebars here because it is not included in the iframe
          'tmp/badges_template.js',
          'src/addons/badges/js/*.js',
          'src/js/modules/template.js',
          'src/js/modules/util.js',
          'src/js/i18n.js',
          'src/js/settings.js'
        ],
        dest: 'tmp/badges-min.js'
      },
      uia: {
        src: ['src/js/i18nuia.js', 'src/js/settingsuia.js'],
        dest: 'dist/uia.js'
      },
    },

    babel: {
      options: {
        sourceType: "script",
        presets: ['@babel/preset-env'],
        sourceMap: true,
      },
      dist: {
        files: {
          'tmp/mmooc-babel.js': 'tmp/mmooc.js'
        }
      }
    },

    uglify: {
      options: {
        sourceMap: {
          includeSources: true
        },
        sourceMapIn: 'tmp/mmooc-babel.js.map', // input sourcemap from a previous compilation
      },
      dist: {
        files: {
          'dist/mmooc-min.js': ['tmp/mmooc-babel.js']
        }
      }
    },

    replace: {
      production: {
        src: ['tmp/mmooc-min.css','tmp/mmooc-min.js', 'tmp/rootaccount.js', 'tmp/subaccount.js'],
        dest: 'dist/',
        replacements: [
          {
            from: 'https://server',
            to: 'https://matematikk-mooc.github.io/frontend'
          },
          {
            from: 'https://udirdesigncss',
            to: 'https://kompetanseplattform.azurewebsites.net/mmooc-min.css'
          },
          {
            from: 'https://udirdesignjs',
            to: 'https://kompetanseplattform.azurewebsites.net/mmooc-min.js'
          }
        ]
      },
      development: {
        src: ['tmp/rootaccount.js','tmp/subaccount.js'],
        dest: 'dist/development/',
        replacements: [
          {
            from: 'https://server',
            to: 'http://localhost:9000'
          },
          {
            from: 'https://udirdesigncss',
            to: 'http://localhost:9000/mmooc-min.css'
          },
          {
            from: 'https://udirdesignjs',
            to: 'http://localhost:9000/mmooc-min.js'
          }
        ]
      },
      production_dataporten: {
        src: ['src/js/tmp/dataporten.js'],
        dest: 'src/js/modules/',
        replacements: [
          {
            from: '$REQUEST',
            to: "['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_kpas']"
          },
          {
            from: '$DATAPORTENCALLBACK',
            to: 'https://bibsys.instructure.com/courses/234?dataportenCallback=1'
          },
          {
            from: '$DATAPORTENCLIENTID',
            to: '823e54e4-9cb7-438f-b551-d1af9de0c2cd'
          },
          {
            from: '$KPASAPIURL',
            to: 'https://kpas.dataporten-api.no'
          }
        ]
      },
      development_dataporten: {
        src: ['src/js/tmp/dataporten.js'],
        dest: 'src/js/modules/',
        replacements: [
          {
            from: '$REQUEST',
            to: "['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_kpasbeta']"
          },          {
            from: '$DATAPORTENCALLBACK',
            to: 'https://localhost/courses/1?dataportenCallback=1'
          },          {
            from: '$DATAPORTENCLIENTID',
            to: 'fb2f6378-2d35-4354-8ae8-2e82e2af2a8f'
          },          {
            from: '$KPASAPIURL',
            to: 'https://kpasbeta.dataporten-api.no'
          }
        ]
      },
      production_settings: {
        src: ['src/js/tmp/settings.js'],
        dest: 'src/js/',
        replacements: [
          {
            from: '$ACCOUNTID',
            to: '[99, 100, 102, 103]'
          }
        ]
      },
      development_settings: {
        src: ['src/js/tmp/settings.js'],
        dest: 'src/js/',
        replacements: [
          {
            from: '$ACCOUNTID',
            to: '[4, 5]'
          }
        ]
      },
      production_badge: {
        src: ['tmp/badges-min.js'],
        dest: 'dist/badgesafe.js',
        replacements: [
          {
            from: 'https://server',
            to: 'https://matematikk-mooc.github.io/frontend'
          }
        ]
      },
      development_badge: {
        src: ['tmp/badges-min.js'],
        dest: 'dist/badges-dev.js',
        replacements: [
          {
            from: 'https://server',
            to: 'http://localhost:9000'
          }
        ]
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, src: ['rootaccount*'], cwd: 'src/css/', dest: 'dist/' },
          { expand: true, src: ['subaccount*'], cwd: 'src/css/', dest: 'dist/' },
          { expand: true, src: ['bitmaps/*'], cwd: 'src/', dest: 'dist/' },
          { expand: true, src: ['vector_images/*'], cwd: 'src/', dest: 'dist/' }
        ]
      }
    },

    connect: {
      staging: { //setup fo staging
        options: {
          port: 3000,
          base: 'dist',
          hostname: '*',
          open: true
        }
      },
      dev: { //setup fo local development
        options: {
          port: 9000,
          base: 'dist',
          hostname: 'localhost',
          open: true
        }
      },
      test: {
        options: {
          port: 9988,
          base: ['spec', 'src/js/api', 'src/js/modules', 'src/js']
        }
      }
    },

    watch: {
      dist: {
        files: [
          'src/css/**/*.less',
          'src/js/**/*.js',
          'src/templates/**/*.hbs',
          'src/addons/badges/js/*.js',
          'src/addons/badges/css/*.less',
          'Gruntfile.js'
        ],
        tasks: ['rebuildServe']
      }
    },

    karma: {
      unitTest: {
        configFile: 'test/js/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        browsers:
          process.env.KARMA_BROWSER == null
            ? ['Firefox', 'Chrome']
            : ['Firefox', 'Chrome', '<%= extraBrowser %>']
      }
    }
  });

  grunt.registerTask('make', [
    'handlebars',
    'concat',
    'babel',
    'uglify',
    'less',
    'copy',
    'replace:production',
    'replace:development',
    'replace:production_badge',
    'replace:development_badge'
  ]);

  grunt.registerTask('dev_dataporten', [
    'replace:development_dataporten'
  ]);

  grunt.registerTask('prod_dataporten', [
    'replace:production_dataporten'
  ]);

  grunt.registerTask('dev_settings', [
    'replace:development_settings'
  ]);

  grunt.registerTask('prod_settings', [
    'replace:production_settings'
  ]);


  grunt.registerTask('runTest', ['connect:test', 'karma:unitTest']);

  grunt.registerTask('test', ['clean', 'make', 'runTest']);

  grunt.registerTask('build', ['prod_dataporten', 'prod_settings', 'make', 'clean:release']);

  grunt.registerTask('rebuildServe', ['clean:dist', 'dev_dataporten', 'dev_settings', 'make']);

  grunt.registerTask('serve', ['clean', 'dev_dataporten', 'dev_settings', 'make', 'connect:dev', 'watch']);
  
  grunt.registerTask('serveStaging', ['clean', 'make', 'connect:staging', 'watch']);

  grunt.registerTask('default', ['clean', 'make']);
};
