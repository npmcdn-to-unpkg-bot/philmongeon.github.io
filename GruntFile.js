module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        uglify: {
            build: {
                options: {
                    mangle: true,
                    beautify: false,
                },
                files: {
                    'scripts/min/main.min.js': 'scripts/main.js'
                }
            }
        },

        less: {
          build: {
            options: {
                paths: ['less'],
                compress: true,
                cleancss: false
            },
            files: {
                'styles/min/main.min.css': 'styles/main.less'
            }
          }
        },

        watch: {
            scripts: {
                files: ['scripts/*.js'],
                tasks: ['uglify']
            },
            styles: {
                files: ['styles/*.less'],
                tasks: ['less']
            }
        }
    
    });

};