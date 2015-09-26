'use strict';
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        //https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            /*
            gruntfile: {
              files: 'Gruntfile.js',
              tasks: ['jshint:gruntfile'],
            },
            */
            data: {
                files: [
                    '<%=pkg.config.sourceFolder %>/data/**/*'
                ],
                tasks: ['copy:data']
            },
            fonts: {
                files: [
                    '<%=pkg.config.sourceFolder %>/fonts/**/*'
                ],
                tasks: ['copy:fonts']
            },
            img: {
                files: [
                    '<%=pkg.config.sourceFolder %>/img/**/*'
                ],
                tasks: ['copy:img']
            },
            root: {
                files: [
                    '<%=pkg.config.sourceFolder %>/*'
                ],
                tasks: ['copy:root']
            },
            hbs: {
                files: [
                    '<%=pkg.config.sourceFolder %>/js/views/**/*.hbs'
                ],
                tasks: ['handlebars']
            },
            js: {
                files: [
                    '<%=pkg.config.sourceFolder %>/js/**/*.js',
                    '!<%=pkg.config.sourceFolder %>/js/vendor/**/*'
                ],
                tasks: ['transpile', 'concat']
            },
            css: {
                files: [
                    '<%=pkg.config.sourceFolder %>/scss/**/*.scss',
                ],
                tasks: ['compass', 'autoprefixer']
            }
        },

        clean: [
            "<%=pkg.config.buildFolder %>/**/*",
            "<%=pkg.config.preReleaseFolder %>/**/*",
            ".tmp/**/*"
        ],

        //https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            data: {
                files: [{
                    cwd: '<%=pkg.config.sourceFolder %>/data',
                    dest: '<%=pkg.config.buildFolder %>/data',
                    src: ['**'],
                    expand: true
                }]
            },
            fonts: {
                files: [{
                    cwd: '<%=pkg.config.sourceFolder %>/fonts',
                    dest: '<%=pkg.config.buildFolder %>/fonts',
                    src: ['**'],
                    expand: true
                }]
            },
            img: {
                files: [{
                    cwd: '<%=pkg.config.sourceFolder %>/img',
                    dest: '<%=pkg.config.buildFolder %>/img',
                    src: ['**'],
                    expand: true
                }]
            },
            root: {
                files: [{
                    expand: true,
                    cwd: '<%=pkg.config.sourceFolder %>/',
                    dest: '<%=pkg.config.buildFolder %>/',
                    src: ['*.*']
                }]
            },
            //copy files initially downloaded by bower (sort of like .bowerrc?)
            setup: {
                files: [{
                    //just-grid-it: https://github.com/dyson/just-grid-it
                    expand: true,
                    cwd: './bower_components/just-grid-it/css/',
                    dest: '<%=pkg.config.sourceFolder %>/scss/',
                    src: ['just-grid-it-all.css'],
                    rename: function(dest, src) {
                        return dest + src.replace('just-grid-it-all.css', '_grid.scss');
                    }
                },{
                    //normalize.css: https://github.com/necolas/normalize.css
                    expand: true,
                    cwd: './bower_components/normalize.css/',
                    dest: '<%=pkg.config.sourceFolder %>/scss/',
                    src: ['normalize.css'],
                    rename: function(dest, src) {
                        return dest + src.replace('normalize.css', '_normalize.scss');
                    }
                }, {
                    //jquery: http://jquery.com/download/
                    expand: true,
                    cwd: './bower_components/jquery/dist/',
                    src: ['jquery.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/',
                    rename: function(dest, src) {
                        return dest + src.replace('jquery', '_jquery');
                    }
                }, {
                    //underscore: https://github.com/jashkenas/underscore
                    expand: true,
                    cwd: './bower_components/underscore/',
                    src: ['underscore.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/',
                    rename: function(dest, src) {
                        return dest + src.replace('underscore', '_underscore');
                    }
                }, {
                    //backbone: https://github.com/jashkenas/backbone/
                    expand: true,
                    cwd: './bower_components/backbone/',
                    src: ['backbone.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/'
                }, {
                    //backbone statemanager: http://github.com/crashlytics/backbone.statemanager
                    expand: true,
                    cwd: './bower_components/backbone.statemanager/',
                    src: ['backbone.statemanager.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/'
                }, {
                    //handlebars: https://github.com/wycats/handlebars.js
                    expand: true,
                    cwd: './bower_components/handlebars/',
                    src: ['handlebars.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/'
                }, {
                    //loader.js: https://github.com/ember-cli/loader.js
                    expand: true,
                    cwd: './bower_components/loader.js/',
                    src: ['loader.js'],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/'
                }, {
                    //GSAP: https://github.com/greensock/GreenSock-JS
                    //Note: There are a variety of plugins available in this repo, so this might need to be adjusted:
                    expand: true,
                    flatten: true,
                    cwd: './bower_components/gsap/src/uncompressed/',
                    src: [
                        //'TweenLite.js',
                        //'TimelineLite.js',
                        'TweenMax.js',
                        'TimelineMax.js',
                        'plugins/CSSPlugin.js',
                        'plugins/ScrollToPlugin.js',
                        'easing/EasePack.js'
                        //more plugins in /bower_components/gsap/src/uncompressed/...
                    ],
                    dest: '<%=pkg.config.sourceFolder %>/js/vendor/libs/tweenlite/'
                }]
            }
        },

        //handlebars: https://github.com/gruntjs/grunt-contrib-handlebars
        handlebars: {
            all: {
                options: {
                    namespace: "JST",
                    processName: function(filename) {
                        var pieces = filename.split("/");
                        return pieces[pieces.length - 1];
                    }
                },
                files: {
                    '<%=pkg.config.buildFolder %>/js/templates.js': "<%=pkg.config.sourceFolder %>/js/views/**/*.hbs"
                }
            }
        },

        //transpile: https://github.com/joefiorini/grunt-es6-module-transpiler
        transpile: {
            all: {
                type: "amd",
                moduleName: function(path) {
                    return grunt.config.data.pkg.name + '/' + path;
                },
                files: [{
                    expand: true,
                    cwd: '<%=pkg.config.sourceFolder %>/js/',
                    src: ['*.js', 'modules/**/*.js', 'collections/**/*.js', 'models/**/*.js', 'views/**/*.js'],
                    dest: './.tmp/transpiled/'
                }]
            }
        },

        //concat: https://github.com/gruntjs/grunt-contrib-concat
        concat: {
            app: {
                src: ['./.tmp/transpiled/**/*.js'],
                dest: '<%=pkg.config.buildFolder %>/js/app.js',
            },
            vendor: {
                src: ['<%=pkg.config.sourceFolder %>/js/vendor/**/*.js'],
                dest: '<%=pkg.config.buildFolder %>/js/vendor.js',
            }
        },

        //https://github.com/gruntjs/grunt-contrib-compass
        compass: {
            all: {
                options: {
                    sassDir: '<%=pkg.config.sourceFolder %>/scss',
                    cssDir: '<%=pkg.config.buildFolder %>/css',
                    watch: false
                }
            }
        },

        //https://github.com/nDmitry/grunt-autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            no_dest: {
                src: '<%=pkg.config.buildFolder %>/css/main.css'
            }
        },

        //https://github.com/ChrisWren/grunt-nodemon
        //ignores node_modules and bower_components by default: https://github.com/remy/nodemon#ignoring-files
        nodemon: {
            all: {
                script: '<%=pkg.config.main %>'
            }
        },

        //https://github.com/sindresorhus/grunt-concurrent
        concurrent: {
            all: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: [
                    //watch for changes to static files
                    //'watch:data', 'watch:fonts', 'watch:img', 'watch:root',
                    //watch for changes to css
                    //'watch:css',
                    //watch for changes to templates
                    //'watch:hbs',
                    //watch for changes to client-side app .js
                    //'watch:js',
                    //watch for changes to node files
                    //'nodemon'
                ]
            }
        },

        //https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            /*
            options: {
                mangle: false
            },
            */
            all: {
                files: {
                    '<%=pkg.config.preReleaseFolder %>/js/app.js': [
                        '<%=pkg.config.buildFolder %>/js/vendor.js',
                        '<%=pkg.config.buildFolder %>/js/templates.js',
                        '<%=pkg.config.buildFolder %>/js/app.js'
                    ]
                }
            }
        },

        //https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            target: {
                files: {
                    '<%=pkg.config.preReleaseFolder %>/css/main.css': ['<%=pkg.config.buildFolder %>/css/main.css']
                }
            }
        },

        //https://github.com/vojtajina/grunt-bump
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },

        //https://github.com/gruntjs/grunt-contrib-compress
        compress: {
            main: {
                options: {
                    archive: "<%=pkg.config.releaseFolder %>/<%= pkg.name %>-<%= pkg.version %>.zip",
                    pretty: true
                },
                files: [
                    //data
                    {
                        cwd: './<%=pkg.config.buildFolder %>/data/',
                        src: '**/*',
                        dest: '/<%=pkg.config.buildFolder %>/data/',
                        expand: true
                    },
                    //fonts
                    {
                        cwd: './<%=pkg.config.buildFolder %>/fonts/',
                        src: '**/*',
                        dest: '/<%=pkg.config.buildFolder %>/fonts/',
                        expand: true
                    },
                    //images
                    {
                        cwd: './<%=pkg.config.buildFolder %>/img/',
                        src: '**/*',
                        dest: '/<%=pkg.config.buildFolder %>/img/',
                        expand: true
                    },
                    //minified files
                    {
                        cwd: './<%=pkg.config.preReleaseFolder %>/',
                        src: '**/*',
                        dest: '/<%=pkg.config.buildFolder %>/',
                        expand: true
                    },
                    //root files
                    {
                        cwd: './<%=pkg.config.buildFolder %>/',
                        src: '*',
                        filter: 'isFile',
                        dest: '/<%=pkg.config.buildFolder %>/',
                        expand: true
                    },
                    //all files/folders in server dir
                    {
                        cwd: './server/',
                        src: '**/*',
                        dest: '/server/',
                        expand: true
                    },
                    //package.json in root to run server
                    {
                        src: ['./package.json'],
                        dest: '/',
                        expand: true
                    }
                ]
            }
        }
    });

    grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();

        exec('bower install', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('emptyTemplates', 'Creates an empty templates.js & vendor.js file for release', function() {
        var preFolder = '.pre';
        grunt.file.write('./' + preFolder + '/js/templates.js', '');
        grunt.file.write('./' + preFolder + '/js/vendor.js', '');
    });

    // Default task.
    grunt.registerTask('default', ['setup', 'dev']);

    grunt.task.registerTask('setup', ['clean', 'install', 'copy:setup']);

    grunt.task.registerTask('build', [
        //update the build folder with static source files
        'copy:data', 'copy:fonts', 'copy:img', 'copy:root',
        //css
        'compass', 'autoprefixer',
        //templates
        'handlebars',
        //js
        'transpile', 'concat'
    ]);

    grunt.task.registerTask('dev', ['build', 'concurrent']);

    //build task can be run from VS CODE, see .settings/tasks.json
    grunt.task.registerTask('release', ['setup', 'build', 'uglify', 'cssmin', 'bump', 'emptyTemplates', 'compress']);
};