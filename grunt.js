/*global module*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      lib: ['dist/js/lib.js']
    },
    min: {
      vendors: {
        src: ['dist/js/vendors.js'],
        dest: 'dist/js/vendors.min.js'
      },
      lib: {
        src: ['dist/js/lib.js'],
        dest: 'dist/js/lib.min.js'
      }
    },
    concat: {
      vendors: {
        src: ['src/js/vendors/jquery.js', 'src/js/vendors/jquery-ui.js'],
        dest: 'dist/js/vendors.js'
      },
      lib: {
        src: ['src/js/lib/my-namespace.js', 'src/js/lib/test-module.js'],
        dest: 'dist/js/lib.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ["stylesheets"]
        },
        files: {
          "stylesheets/styles.css": "stylesheets/styles.less",
          "stylesheets/text.css": "stylesheets/text.less"
        }
      }
    }
  });

  //initialize grunt lessCSS build manager
  grunt.loadNpmTasks('grunt-contrib-less');
  
  // Default task
  // 1. concatenate
  // 2. minify
  grunt.registerTask('lib', 'concat:lib lint:lib min:lib');

  // Vendor task
  grunt.registerTask('vendors', 'concat:vendors min:vendors');

  //lessCSS task
  // grunt.registerTask('styles', 'less');

   grunt.registerTask('default', 'less: development');
};
