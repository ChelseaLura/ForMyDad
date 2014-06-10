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
                    //'./bower_components/**/*',
                    '!Gruntfile.js'
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

        connect: {
            options: {
                port: process.env.PORT || 3000,
                base: 'dist/client.js'
              },
            all: {}
        },

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
        }
    });

    grunt.registerTask('default', 'jshint');
    grunt.registerTask('build', ['clean','copy']);
    grunt.registerTask('serve', ['build', 'express:dev','watch']);

};
