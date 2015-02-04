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
		'clean:dist',
		'connect:test',
		'mocha_phantomjs'
	]);


	grunt.registerTask('build', [
		'clean:dist',
		'concurrent:predist',
		'requirejs:dist',
		'copy',
		'compass',
		'concurrent:dist',
		'replace'
	]);

	grunt.registerTask('dist', [
		'build',
		'configureRewriteRules',
		'configureProxies',
		'open:dist',
		'connect:dist'
	]);

	grunt.registerTask('default', [
		'clean:dist',
		'copy:leaflet',
		'copy:modalview',
		'copy:downloadview',
		'copy:locationview_images_dev',
		'compass:dev',
		'configureRewriteRules',
		'configureProxies',
		'connect:test',
		'connect:dev',
		'watch'
	]);

};
