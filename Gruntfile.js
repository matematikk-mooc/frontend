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
	    	development: {
	        	options: {
	            	cleancss: true
	        	},
	        	files: {
	            	'dist/mmooc-min.css': ['src/css/all.less']
	        	}
	    	}
		},

		concat: {
	        js: {
	            src: ['tmp/templates.js', 'src/js/api/*.js', 'src/js/modules/*.js', 'src/js/i18n.js', 'src/js/main.js'],
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
		'less'
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