# How to get started with GruntJS

GruntJs is a command line based tool for Javascript projects. https://github.com/gruntjs/grunt

## 1. Install Grunt

* Install nodejs first if you haven't
* Then install grunt `npm install -g grunt`

## 2. Create the grunt file

The grunt file will allow you to describe the task you want to perform with grunt:

* Create a grunt.js at the root of your javascript project
* Copy paste the code below:
```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js']
    },
    jshint: {
      options: {
        browser: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint jshint');
};
```

The grunt file below describes the "default" grunt task that will be used when executing `grunt` with the command line.
We can see that the `default` task will execute the `lint` and `jshint` command defined in `grunt.initConfig`.
In the example below `lint` will lint the grunt.js file.

## 3. Grunt commands

Grunt comes out of the box with a bunch of command:
* concat - Concatenate files.
* init - Generate project scaffolding from a predefined template.
* lint - Validate files with JSHint.
* min - Minify files with UglifyJS.
* qunit - Run QUnit unit tests in a headless PhantomJS instance.
* server - Start a static web server.
* test - Run unit tests with nodeunit.
* watch - Run predefined tasks whenever watched files change.

Here is a more elaborate example using the files of this repository.
`git clone git@github.com:maxparm/Test-GruntJS.git`


```javascript
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
    }
  });

  // Lib task
  grunt.registerTask('lib', 'concat:lib lint:lib min:lib');

  // Vendor task
  grunt.registerTask('vendors', 'concat:vendors min:vendors');
};
```

So for example when executing `grunt lib` in your command line you will execute in the order:
* `concat:lib` which concatenates the files describe in the concat.lib.src in one file `dist/js/lib.js`
* `lint:lib` to lint `dist/js/lib.js`
* `min:lib` to minify `dist/js/lib.js` in `dist/js/lib.min.js`


Et voila le resultat!
```bash
$ grunt lib
Running "concat:lib" (concat) task
File "dist/js/lib.js" created.

Running "lint:lib" (lint) task
Lint free.

Running "min:lib" (min) task
File "dist/js/lib.min.js" created.
Uncompressed size: 984 bytes.
Compressed size: 191 bytes gzipped (296 bytes minified).
```

You have concatenate, lint and minify your library files in a few seconds! Simple no!?



Additions for LessCSS

1) install grunt-contrib-less with `npm install grunt-contrib-less`

note this needs to be done

2) to get your grunt.js file to work with add this line before the first grunt.registerTask()

`grunt.loadNpmTasks('grunt-contrib-less');`

3) inside the grunt.initConfig{} object put in a new less object like the below

 `less: {
      development: {
        options: {
          paths: ["stylesheets"]
        },
        files: {
          "stylesheets/styles.css": "stylesheets/styles.less",
          "stylesheets/text.css": "stylesheets/text.less"
        }
      }
    }`

  note that to call this  grunt.registerTask('styles', 'less');  