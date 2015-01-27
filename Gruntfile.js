'use strict';

module.exports = function(grunt) {

	// Helper function to load pre-defined grunt tasks 
	require('load-grunt-tasks')(grunt);

	// Configures grunt tasks
	grunt.initConfig({

		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['dist', 'tmp']
				}]
			}
		},

		handlebars: {
		    compile: {
                options: {
                    namespace: 'mmooc.templates',
                    processName: function(filePath) {
     				   return filePath.replace('src/templates/modules/', '').replace(/\.hbs$/, '');
    				}
                },                
		        files: {
		            "tmp/templates.js": ["src/templates/**/*.hbs"]
		        }
		    }
		},

		less: {	    	
	    	all: {
	        	options: {
	            	cleancss: true
	        	},
	        	files: {
	            	'tmp/mmooc-min.css': ['src/css/all.less']
	        	}
	    	}
		},

		concat: {
	        js: {
	            src: ['tmp/templates.js', 'src/js/api/*.js', 'src/js/modules/*.js', 'src/js/i18n.js', 'src/js/main.js', 'src/js/3party/*.js'],
	            dest: 'dist/mmooc-min.js'
	        }        
	    },

		uglify: {
		  dist: {
		    files: {
		      'dist/mmooc-min.js': ['tmp/mmooc.js']
		    }
		  }
		},

		replace: {
			production: {
				src: ['tmp/mmooc-min.css'],
				dest: 'dist/mmooc-min.css',
				replacements: [{
					from: 'https://server',
					to: 'https://apps.kantega.no/mmooc'
				}]
			},
			development: {
				src: ['tmp/mmooc-min.css'],
				dest: 'dist/mmooc-min-dev.css',
				replacements: [{
					from: 'https://server',
					to: 'http://localhost:9000'
				}]
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, src: ['bitmaps/*'], cwd: 'src/', dest: 'dist/'}
				]
			}
		},

		connect: {
			dist: {
				options: {
					port: 9000,
					base: 'dist',
					hostname: 'localhost',
					open: true
				}
			}
		},

		watch: {
			dist: {
				files: [
				'src/css/**/*.less',
				'src/js/**/*.js',
				],
				tasks: ['clean', 'build']
			}
		}

	});

	grunt.registerTask('build', [
		'handlebars',
		'concat',
		//'uglify',
		'less',
		'copy',
		'replace:production',
		'replace:development'
		]);

	grunt.registerTask('serve', [
				'clean',
                'build',
                'connect',
                'watch'
                ]);

	grunt.registerTask('default', [
		'clean',
		'build'
		]);

};