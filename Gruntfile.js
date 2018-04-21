// AdminLTE Gruntfile
module.exports = function (grunt) { // jshint ignore:line
  'use strict'

  grunt.initConfig({
    pkg   : grunt.file.readJSON('package.json'),
    watch : {
      less : {
        // Compiles less files upon saving
        files: ['build/less/*.less'],
        tasks: ['less:development', 'less:production', 'replace', 'notify:less']
      },
      js   : {
        // Compile js files upon saving
        files: ['build/js/*.js'],
        tasks: ['js', 'notify:js']
      },
      skins: {
        // Compile any skin less files upon saving
        files: ['build/less/skins/*.less'],
        tasks: ['less:skins', 'less:minifiedSkins', 'notify:less']
      }
    },
    // Notify end of tasks
    notify: {
      less: {
        options: {
          title  : 'TravelMe',
          message: 'LESS finished running'
        }
      },
      js  : {
        options: {
          title  : 'TravelMe',
          message: 'JS bundler finished running'
        }
      }
    },
    // 'less'-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less  : {
      // Development not compressed
      development  : {
        files: {
          // compilation.css  :  source.less
          'assets/css/travelme.css'                     : 'build/less/AdminLTE.less',
          // AdminLTE without plugins
          'assets/css/alt/travelme-without-plugins.css' : 'build/less/AdminLTE-without-plugins.less',
          // Separate plugins
          'assets/css/alt/travelme-select2.css'         : 'build/less/select2.less',
          'assets/css/alt/travelme-fullcalendar.css'    : 'build/less/fullcalendar.less',
          'assets/css/alt/travelme-bootstrap-social.css': 'build/less/bootstrap-social.less'
        }
      },
      // Production compressed version
      production   : {
        options: {
          compress: true
        },
        files  : {
          // compilation.css  :  source.less
          'assets/css/travelme.min.css'                     : 'build/less/AdminLTE.less',
          // AdminLTE without plugins
          'assets/css/alt/travelme-without-plugins.min.css' : 'build/less/AdminLTE-without-plugins.less',
          // Separate plugins
          'assets/css/alt/travelme-select2.min.css'         : 'build/less/select2.less',
          'assets/css/alt/travelme-fullcalendar.min.css'    : 'build/less/fullcalendar.less',
          'assets/css/alt/travelme-bootstrap-social.min.css': 'build/less/bootstrap-social.less'
        }
      },
      // Non minified skin files
      skins        : {
        files: {
          'assets/css/skins/skin-blue.css'        : 'build/less/skins/skin-blue.less',
          'assets/css/skins/skin-black.css'       : 'build/less/skins/skin-black.less',
          'assets/css/skins/skin-yellow.css'      : 'build/less/skins/skin-yellow.less',
          'assets/css/skins/skin-green.css'       : 'build/less/skins/skin-green.less',
          'assets/css/skins/skin-red.css'         : 'build/less/skins/skin-red.less',
          'assets/css/skins/skin-purple.css'      : 'build/less/skins/skin-purple.less',
          'assets/css/skins/skin-blue-light.css'  : 'build/less/skins/skin-blue-light.less',
          'assets/css/skins/skin-black-light.css' : 'build/less/skins/skin-black-light.less',
          'assets/css/skins/skin-yellow-light.css': 'build/less/skins/skin-yellow-light.less',
          'assets/css/skins/skin-green-light.css' : 'build/less/skins/skin-green-light.less',
          'assets/css/skins/skin-red-light.css'   : 'build/less/skins/skin-red-light.less',
          'assets/css/skins/skin-purple-light.css': 'build/less/skins/skin-purple-light.less',
          'assets/css/skins/_all-skins.css'       : 'build/less/skins/_all-skins.less'
        }
      },
      // Skins minified
      minifiedSkins: {
        options: {
          compress: true
        },
        files  : {
          'assets/css/skins/skin-blue.min.css'        : 'build/less/skins/skin-blue.less',
          'assets/css/skins/skin-black.min.css'       : 'build/less/skins/skin-black.less',
          'assets/css/skins/skin-yellow.min.css'      : 'build/less/skins/skin-yellow.less',
          'assets/css/skins/skin-green.min.css'       : 'build/less/skins/skin-green.less',
          'assets/css/skins/skin-red.min.css'         : 'build/less/skins/skin-red.less',
          'assets/css/skins/skin-purple.min.css'      : 'build/less/skins/skin-purple.less',
          'assets/css/skins/skin-blue-light.min.css'  : 'build/less/skins/skin-blue-light.less',
          'assets/css/skins/skin-black-light.min.css' : 'build/less/skins/skin-black-light.less',
          'assets/css/skins/skin-yellow-light.min.css': 'build/less/skins/skin-yellow-light.less',
          'assets/css/skins/skin-green-light.min.css' : 'build/less/skins/skin-green-light.less',
          'assets/css/skins/skin-red-light.min.css'   : 'build/less/skins/skin-red-light.less',
          'assets/css/skins/skin-purple-light.min.css': 'build/less/skins/skin-purple-light.less',
          'assets/css/skins/_all-skins.min.css'       : 'build/less/skins/_all-skins.less'
        }
      }
    },

    // Uglify task info. Compress the js files.
    uglify: {
      options   : {
        mangle          : true,
        preserveComments: 'some'
      },
      production: {
        files: {
          'assets/js/admintravelme.min.js': ['assets/js/adminlte.js']
        }
      }
    },

    // Concatenate JS Files
    concat: {
      options: {
        separator: '\n\n',
        banner   : '/*! TravelMe app.js */'
      },
      dist   : {
        src : [
          'build/js/BoxRefresh.js',
          'build/js/BoxWidget.js',
          'build/js/ControlSidebar.js',
          'build/js/DirectChat.js',
          'build/js/Layout.js',
          'build/js/PushMenu.js',
          'build/js/TodoList.js',
          'build/js/Tree.js'
        ],
        dest: 'assets/js/travelme.js'
      }
    },

    // Replace image paths in AdminLTE without plugins
    replace: {
      withoutPlugins   : {
        src         : ['assets/css/alt/travelme-without-plugins.css'],
        dest        : 'assets/css/alt/travelme-without-plugins.css',
        replacements: [
          {
            from: '../img',
            to  : '../../img'
          }
        ]
      },
      withoutPluginsMin: {
        src         : ['assets/css/alt/travelme-without-plugins.min.css'],
        dest        : 'assets/css/alt/travelme-without-plugins.min.css',
        replacements: [
          {
            from: '../img',
            to  : '../../img'
          }
        ]
      }
    },

    // Build the documentation files
    includes: {
      build: {
        src    : ['*.html'], // Source files
        dest   : 'documentation/', // Destination directory
        flatten: true,
        cwd    : 'documentation/build',
        options: {
          silent     : true,
          includePath: 'documentation/build/include'
        }
      }
    },

    // Optimize images
    image: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd   : 'build/img/',
            src   : ['**/*.{png,jpg,gif,svg,jpeg}'],
            dest  : 'assets/assets/img/'
          }
        ]
      }
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: 'build/less/.csslintrc'
      },
      dist   : [
        'assets/css/travelme.css'
      ]
    },

    // Delete images in build directory
    // After compressing the images in the build/img dir, there is no need
    // for them
    clean: {
      build: ['build/img/*']
    }
  })

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less')
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch')
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify')
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes')
  // Optimize images
  grunt.loadNpmTasks('grunt-image')
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-jscs')
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean')
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint')
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint')
  // Concatenate JS files
  grunt.loadNpmTasks('grunt-contrib-concat')
  // Notify
  grunt.loadNpmTasks('grunt-notify')
  // Replace
  grunt.loadNpmTasks('grunt-text-replace')

  // Linting task
  grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint'])
  // JS task
  grunt.registerTask('js', ['concat', 'uglify'])
  // CSS Task
  grunt.registerTask('css', ['less:development', 'less:production', 'less:skins', 'replace'])

  // The default task (running 'grunt' in console) is 'watch'
  grunt.registerTask('default', ['watch'])
}
