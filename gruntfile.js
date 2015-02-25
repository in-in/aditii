module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    watch: {
      sass: {
        files: "dev/scss/*.scss",
        tasks: ['sass:dev', 'autoprefixer']
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'nested',
          imagePath: '../img'
        },
        files: {
          "dev/css/style.css": "dev/scss/style.scss"
        }
      }
    },
    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 2 versions']
        },
        files: [{
          src: 'dev/css/style.css'
        }]
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "dev/css/*.css",
            "dev/*.html"
          ]
        },
        options: {
          watchTask: true,
          port: 3003,
          notify: false,
          injectChanges: true,
          open: true,
          browser: "chromium-browser",
          server: {
            baseDir: "dev"
          }
        }
      }
    },
    
//    CssComb
    
    csscomb: {
      css: {
        options: {
          config: '.csscomb.json'
        },
        files: {
          'dev/scss/style.scss': ['dev/scss/style.scss'],
          'dev/css/style.css': ['dev/css/style.css']
        }
      }
    },
    
    // Build tasks
    
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'dev/',
            src: ['**', '!**/scss/**'],
            dest: 'build/'
          }
        ]
      }
    },
    cssmin: {
      build: {
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'dev/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img/'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('comb', ['csscomb']);
  grunt.registerTask('build', ['copy', 'cssmin', 'htmlmin', 'imagemin']);
  grunt.registerTask('default', ['browserSync', 'autoprefixer', 'watch']);
};