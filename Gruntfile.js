module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        folders: {
            bower: './bower_components',
            source: './src/js',
            plupload: '<%= folders.bower %>/plupload/js'
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    '<%= folders.source %>/plupload-angular-directive.js',
                    '<%= folders.plupload %>/plupload.full.js'
                ],
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
                    {expand: false, src: ['<%= folders.plupload %>/plupload.flash.swf'], dest: 'dist/plupload.flash.swf'},
                    {expand: false, src: ['<%= folders.plupload %>/plupload.silverlight.xap'], dest: 'dist/plupload.silverlight.xap'},
                    {expand: false, src: ['<%= folders.plupload %>/plupload.flash.cors.swf'], dest: 'dist/plupload.flash.cors.swf'},
                    {expand: false, src: ['<%= folders.plupload %>/plupload.silverlight.cors.xap'], dest: 'dist/plupload.silverlight.cors.xap'}
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