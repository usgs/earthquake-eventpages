'use strict';

module.exports = function (grunt) {

  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.event.on('watch', function (action, filepath) {
    // Only lint the file that actually changed
    grunt.config(['jshint', 'scripts'], filepath);
  });

  grunt.registerTask('test', [
    'build',
    'connect:test',
    'mocha_phantomjs'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'jshint:scripts',
    'jshint:tests',
    'browserify',
    'postcss:build',
    'copy:build',
    'copy:test',
    'copy:leaflet',
    'copy:locationview_images'
  ]);

  grunt.registerTask('dist', [
    'build',
    'clean:dist',
    'copy:dist',
    'postcss:dist',
    'uglify',
    'configureRewriteRules',
    'configureProxies:dist',
    'connect:template',
    'connect:dist'
  ]);

  grunt.registerTask('default', [
    'build',
    'configureRewriteRules',
    'configureProxies:dev',
    'configureProxies:test',
    'connect:template',
    'connect:dev',
    'connect:test',
    'mocha_phantomjs',
    'watch'
  ]);

};
