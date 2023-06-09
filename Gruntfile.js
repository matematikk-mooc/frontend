'use strict';

module.exports = function (grunt) {
  /*
  Instead of using grunt.loadNpmTasks('grunt-contrib-uglify')
  Use require('load-grunt-tasks')(grunt); to load
  all grunt tasks matching 'grunt-*' from package.json
  */
  require('load-grunt-tasks')(grunt);

  // Grabs the --udv flag from the command line
  // Example: grunt build --udv="1.0.0"
  var udv = grunt.option('udv');

  // Configure grunt tasks
  grunt.initConfig({

    // Project filenames
    outFileName: 'mmooc-min-' + udv,
    srcFileName: 'mmooc-' + udv,
    subaccountFileName: 'subaccount-' + udv,
    rootaccountFileName: 'rootaccount-' + udv,

    //Formatting tasks
    prettier: {
      options: {
        config: '.prettierrc',
      },
      html: {
        src: ['**/*.html', '!node_modules/**'],
      },
    },

    //Linting tasks
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      all: {
        src: grunt.file.expand('**/*.html', '!node_modules/**')
      }
    },

    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['dist', 'tmp', 'babel', 'replace']
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
          'tmp/<%= outFileName%>.css': ['src/css/all.less'],
          'dist/badgesafe.css': ['src/addons/badges/css/all.less'],
          'tmp/<%= rootaccountFileName%>.css': ['src/css/allrootaccount.less']
        }
      }
    },

    concat: {
      options: {
        sourceMap: true,
      },
      js: {
        src: [
          'src/js/utilities/*.js',
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
        dest: 'tmp/<%= srcFileName%>.js'
      },
      rootaccount: {
        src: ['src/js/settingsRoot.js', 'src/js/utilRoot.js', 'src/js/rootaccount.js'],
        dest: 'tmp/<%= rootaccountFileName%>.js'
      },
      subaccount: {
        src: ['src/js/settingsRoot.js', 'src/js/utilRoot.js', 'src/js/subaccount.js'],
        dest: 'tmp/<%= subaccountFileName%>.js'
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
        compact: false,
        sourceMap: true,
      },
      dist: {
        files: {
          'babel/mmooc-babel.js': 'replace/<%= srcFileName%>.js'
        }
      }
    },

    uglify: {
      options: {
        sourceMap: {
          includeSources: true
        },
        sourceMapIn: 'babel/mmooc-babel.js.map', // input sourcemap from a previous compilation
      },
      dist: {
        files: {
          'dist/<%= outFileName%>.js': ['babel/mmooc-babel.js']
        }
      }
    },

    replace: {
      production: {
        src: ['tmp/<%= outFileName%>.css', 'tmp/<%= rootaccountFileName%>.css', 'tmp/<%= srcFileName%>.js', 'tmp/<%= rootaccountFileName%>.js', 'tmp/<%= subaccountFileName%>.js'],
        dest: 'replace/',
        replacements: [
          {
            from: 'https://server',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign'
          },
          {
            from: 'https://udirdesigncss',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign/<%= outFileName%>.css'
          },
          {
            from: 'https://udirdesignjs',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign/<%= outFileName%>.js'
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          },
          {
            from: '$KPASAPIURL',
            to: 'https://kpas.kompetanse.udir.no/api'
          }
        ]
      },
      stage: {
        src: ['tmp/<%= outFileName%>.css','tmp/<%= rootaccountFileName%>.css', 'tmp/<%= srcFileName%>.js', 'tmp/<%= rootaccountFileName%>.js', 'tmp/<%= subaccountFileName%>.js'],
        dest: 'replace/',
        replacements: [
          {
            from: 'https://server',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign-staging'
          },
          {
            from: 'https://udirdesigncss',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign-staging/<%= outFileName%>.css'
          },
          {
            from: 'https://udirdesignjs',
            to: 'https://kompetanseudirno.azureedge.net/udirdesign-staging/<%= outFileName%>.js'
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          },
          {
            from: '$KPASAPIURL',
            to: 'https://kpas-lti-staging-kpas.azurewebsites.net/api'
          }
        ]
      },
      development: {
        src: ['tmp/<%= outFileName%>.css','tmp/<%= rootaccountFileName%>.css', 'src/js/rootaccountfwd-dev.js','src/js/subaccountfwd-dev.js','tmp/<%= srcFileName%>.js', 'tmp/<%= rootaccountFileName%>.js','tmp/<%= subaccountFileName%>.js'],
        dest: 'replace/',
        replacements: [
          {
            from: 'https://server',
            to: 'http://localhost:9000'
          },
          {
            from: 'https://udirdesigncss',
            to: 'http://localhost:9000/<%= outFileName%>.css'
          },
          {
            from: 'https://udirdesignjs',
            to: 'http://localhost:9000/<%= outFileName%>.js'
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          },
          {
            from: '$KPASAPIURL',
//            to: 'https://kpas-lti.azurewebsites.net/api'
//            to: 'https://kpas.kompetanse.udir.no/api'
            to: 'https://4b01-2001-4647-a388-0-d5d0-6375-9e7f-c1a0.ngrok.io/api'
          }
        ]
      },
      production_kpas: {
        src: [
          'dist/kpas/style.css',
          'dist/kpas/kpas.html',
          'dist/kpas/brukere.html',
          'dist/kpas/grupper.html',
          'dist/kpas/main.js'],
        dest: 'dist/kpas/',
        replacements: [
          {
            from: 'https://server',
            to: "https://kompetanseudirno.azureedge.net/"
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          }
        ]
      },
      stage_kpas: {
        src: [
          'dist/kpas/style.css',
          'dist/kpas/kpas.html',
          'dist/kpas/brukere.html',
          'dist/kpas/grupper.html',
          'dist/kpas/main.js'],
        dest: 'dist/kpas/',
        replacements: [
          {
            from: 'https://server',
            to: "https://kompetanseudirno.azureedge.net/"
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          }
        ]
      },
      development_kpas: {
        src: [
          'dist/kpas/style.css',
          'dist/kpas/kpas.html',
          'dist/kpas/brukere.html',
          'dist/kpas/grupper.html',
          'dist/kpas/main.js'],
        dest: 'dist/kpas/',
        replacements: [
          {
            from: 'https://server',
            to: "http://localhost:9000"
          },
          {
            from: 'KPAS_IFRAME_VERSION',
            to: udv
          }
        ]
      },

      production_settings: {
        src: ['src/js/tmp/settings.js'],
        dest: 'src/js/',
        replacements: [
          {
            from: '$ACCOUNTID',
            to: '[99, 100, 102, 103, 137, 138, 139, 145]'
          },
          {
            from: '$KPAS_MERGE_LTI_ID',
            to: '845'
          }
        ]
      },
      stage_settings: {
        src: ['src/js/tmp/settings.js'],
        dest: 'src/js/',
        replacements: [
          {
            from: '$ACCOUNTID',
            to: '[99, 100, 102, 103, 137, 138, 139, 145]'
          },
          {
            from: '$KPAS_MERGE_LTI_ID',
            to: '863'
          }
        ]
      },
      development_settings: {
        src: ['src/js/tmp/settings.js'],
        dest: 'src/js/',
        replacements: [
          {
            from: '$ACCOUNTID',
            to: '[99, 100, 102, 103, 137, 138, 139, 145]'
          },
          {
            from: '$KPAS_MERGE_LTI_ID',
            to: '863'
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
      stage_badge: {
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
          { expand: true, src: ['<%= rootaccountFileName%>*'], cwd: 'replace/', dest: 'dist/' },
          { expand: true, src: ['<%= subaccountFileName%>*'], cwd: 'replace/', dest: 'dist/' },
          { expand: true, src: ['bitmaps/*'], cwd: 'src/', dest: 'dist/' },
          { expand: true, src: ['vector_images/*'], cwd: 'src/', dest: 'dist/' },
          { expand: true, src: ['<%= outFileName%>.css'], cwd: 'replace/', dest: 'dist/' },
          { expand: true, src: ['*'], cwd: 'replace/', dest: 'dist/' },
          { expand: true, src: ['*'], cwd: 'kpas/', dest: 'dist/kpas' }
        ]
      },
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
      dev_mobile: { //setup fo local development
        options: {
          port: 9000,
          base: 'dist',
          hostname: 'localhost',
          protocol: 'https',
//          key: grunt.file.read('server.key').toString(),
//          cert: grunt.file.read('server.crt').toString(),
//          ca: grunt.file.read('ca.crt').toString(),
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
          'kpas/*',
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

    //Unused will be resolved by jira issue: KURSP-769
    // karma: {
      // unitTest: {
        // configFile: 'test/js/karma.conf.js',
        // autoWatch: false,
        // singleRun: true,
        // browsers:
          // process.env.KARMA_BROWSER == null
            // ? ['Firefox', 'Chrome']
            // : ['Firefox', 'Chrome', '<%= extraBrowser %>']
      // }
    // }
  });

  grunt.registerTask('make', [
    'prettier',
    'htmlhint',
    'less',
    'handlebars',
    'concat',
    'replace:production_settings',
    'replace:production',
    'replace:production_kpas',
    'babel',
    'uglify',
    'copy:main',
  ]);
  grunt.registerTask('make_staging', [
    'prettier',
    'htmlhint',
    'less',
    'handlebars',
    'concat',
    'replace:stage_settings',
    'replace:stage',
    'replace:stage_kpas',
    'babel',
    'uglify',
    'copy:main',
  ]);
  grunt.registerTask('make_dev', [
    'prettier',
    'htmlhint',
    'less',
    'handlebars',
    'concat',
    'replace:development_settings',
    'replace:development_badge',
    'replace:development',
    'replace:development_kpas',
    'babel',
    'uglify',
    'copy:main',
  ]);


  grunt.registerTask('dev_development_mobile', ['replace:development_mobile',]);

  // grunt.registerTask('runTest', ['connect:test', 'karma:unitTest']);
  //Unused will be resolved by jira issue: KURSP-769
  grunt.registerTask('runTest', ['connect:test']);

  grunt.registerTask('test', ['clean', 'make', 'runTest']);

  grunt.registerTask('build', ['make']);

  grunt.registerTask('staging', ['make_staging']);

  grunt.registerTask('rebuildServe', ['clean:dist', 'make_dev']);

  grunt.registerTask('serve', ['clean', 'make_dev', 'connect:dev', 'watch']);

  grunt.registerTask('serveStaging', ['clean', 'make', 'connect:staging', 'watch']);

  grunt.registerTask('default', ['clean', 'make']);
};

