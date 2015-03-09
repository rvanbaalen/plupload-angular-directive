module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js','src/**/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            },
            files: ['src/js/plupload-angular-directive.js']
        },

        copy: {
            main: {
                files: [
                    {expand: false, src: ['src/lib/plupload/plupload.flash.swf'], dest: 'dist/plupload.flash.swf'},
                    {expand: false, src: ['src/lib/plupload/plupload.silverlight.xap'], dest: 'dist/plupload.silverlight.xap'},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-conventional-changelog');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy']);

};