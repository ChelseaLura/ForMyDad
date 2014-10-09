/*jslint node: true */
'use strict';

module.exports = function(grunt){
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist'],

        copy: {
            main:{
                src: [
                    'app/*.css',
                    'app/*.html',
                ],
                dest: 'dist/',
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js','server.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        browserify: {
            all: {
                src: 'app/js/*.js',
                dest: 'dist/app/client.js'
            },
            options: {
                transform: ['debowerify'],
                debug: true
            }
        },

        // connect: {
        //     options: {
        //         port: process.env.PORT || 3000,
        //         base: 'dist/app/'
        //       },
        //     all: {}
        // },

        watch: {
            scripts: {
                files: ['app/**/*'],
                tasks: ['build']
            }
        },

        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js'
                }
            }
        },
        simplemocha: {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd'
            },
            all: { src: ['tests/**Test.js'] }
        },

    });

    grunt.registerTask('default', 'jshint');
    grunt.registerTask('build', ['clean','copy', 'browserify']);
    grunt.registerTask('serve', ['build', 'express:dev','watch']);
    grunt.registerTask('test', ['build', 'express:test', 'simplemocha']);

};
