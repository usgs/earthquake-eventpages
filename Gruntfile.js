'use strict';

var LIVE_RELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVE_RELOAD_PORT});
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
var gateway = require('gateway');
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

var mountPHP = function (dir, options) {
	options = options || {
		'.php': 'php-cgi',
		'env': {
			'PHPRC': process.cwd() + '/node_modules/hazdev-template/src/conf/php.ini'
		}
	};
	return gateway(require('path').resolve(dir), options);
};

module.exports = function (grunt) {

	// Load grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// App configuration, used throughout
	var appConfig = {
		src: 'src',
		dist: 'dist',
		test: 'test',
		tmp: '.tmp'
	};

	grunt.initConfig({
		app: appConfig,
		watch: {
			scripts: {
				files: ['<%= app.src %>/htdocs/**/*.js'],
				tasks: ['concurrent:scripts'],
				options: {
					livereload: LIVE_RELOAD_PORT
				}
			},
			scss: {
				files: ['<%= app.src %>/htdocs/**/*.scss'],
				tasks: ['copy:leaflet', 'compass:dev']
			},
			tests: {
				files: ['<%= app.test %>/*.html', '<%= app.test %>/**/*.js'],
				tasks: ['concurrent:tests']
			},
			livereload: {
				options: {
					livereload: LIVE_RELOAD_PORT
				},
				files: [
					'<%= app.src %>/htdocs/**/*.php',
					'<%= app.src %>/htdocs/**/*.html',
					'<%= app.src %>/htdocs/img/**/*.{png,jpg,jpeg,gif}',
					'.tmp/**/*.css',
					'<%= app.lib %>/inc/**/*.php'
				]
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:gruntfile']
			}
		},
		concurrent: {
			scripts: ['jshint:scripts', 'mocha_phantomjs'],
			tests: ['jshint:tests', 'mocha_phantomjs'],
			predist: [
				'jshint:scripts',
				'jshint:tests',
				'compass',
				'copy'
			],
			dist: [
				'cssmin:dist',
				'htmlmin:dist',
				'uglify'
			]
		},
		connect: {
			options: {
				hostname: 'localhost'
			},
			proxies: [{
				context: '/product',
				host: 'comcat.cr.usgs.gov',
				port: 80,
				https: false,
				changeOrigin: true,
				xforward: false
			}],
			rules: {
				'^/theme/(.*)$': '/hazdev-template/src/htdocs/$1'
			},
			dev: {
				options: {
					base: '<%= app.src %>/htdocs',
					port: 8080,
					components: 'node_modules',
					middleware: function (connect, options) {
						return [
							lrSnippet,
							rewriteRulesSnippet,
							proxySnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, options.components),
							mountPHP(options.base),
							mountFolder(connect, options.base),
							mountFolder(connect, 'node_modules')
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= app.dist %>/htdocs',
					port: 8081,
					keepalive: true,
					middleware: function (connect, options) {
						return [
							proxySnippet,
							mountPHP(options.base),
							mountFolder(connect, options.base),
							// add template
							rewriteRulesSnippet,
							mountFolder(connect, 'node_modules')
						];
					}
				}
			},
			test: {
				options: {
					base: '<%= app.test %>',
					components: 'node_modules',
					port: 8000,
					middleware: function (connect, options) {
						return [
							rewriteRulesSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, options.base),
							mountFolder(connect, 'node_modules'),
							mountFolder(connect, appConfig.src + '/htdocs/modules'),
							// module css is relative to module root which is at '/' above
							mountFolder(connect, '.tmp/modules')
						];
					}
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: ['Gruntfile.js'],
			scripts: [
				'<%= app.src %>/htdocs/js/**/*.js',
				'<%= app.src %>/htdocs/modules/**/*.js'
			],
			tests: ['<%= app.test %>/**/*.js']
		},
		compass: {
			dev: {
				options: {
					sassDir: '<%= app.src %>/htdocs',
					cssDir: '<%= app.tmp %>',
					environment: 'development'
				}
			}
		},
		mocha_phantomjs: {
			all: {
				options: {
					urls: [
						'http://<%= connect.options.hostname %>:<%= connect.test.options.port %>/index.html'
					]
				}
			}
		},
		requirejs: {
			dist: {
				options: {
					appDir: appConfig.src + '/htdocs',
					baseUrl: 'js',
					dir: appConfig.dist + '/htdocs',
					useStrict: true,
					wrap: false,

					paths: {
						leaflet: '../../../node_modules/leaflet/dist/leaflet-src',
						mvc: '../../../node_modules/hazdev-webutils/src/mvc',
						util: '../../../node_modules/hazdev-webutils/src/util',
						tablist: '../../../node_modules/hazdev-tablist/src/tablist',
						svgimagemap: '../../../node_modules/hazdev-svgimagemap/src/svgimagemap',
						quakeml: '../../../node_modules/quakeml-parser-js/src/quakeml',
						theme: '../../../node_modules/hazdev-template/src/htdocs/js',


						base: '../modules/base/0-0-1/js',
						summary: '../modules/summary/0-0-1/js',
						impact: '../modules/impact/0-0-1/js',
						scientific: '../modules/scientific/0-0-1/js'
					},

					shim: {
						leaflet: {
							exports: 'L'
						}
					},

					modules: (function () {
						var BUNDLED_DEPENDENCIES = [
							'tablist/Tablist',
							'base/EventModulePage',
							'base/EventModulePages',
							'base/TabbedModulePage',
							'base/ContentsXML',
							'base/Formatter',
							'util/Util',
							'util/Xhr'
						];
						return [
							{
								name: 'index',
								include: BUNDLED_DEPENDENCIES,
								exclude: [
									// provided by event page
									'EventDetails',
									// provided by template
									'theme/OffCanvas'
								]
							},
							{
								name: 'summary/InteractiveMap',
								exclude: BUNDLED_DEPENDENCIES
							},
							{
								name: 'impact/DYFIPage',
								exclude: BUNDLED_DEPENDENCIES
							},
							{
								name: 'impact/ShakeMapPage',
								exclude: BUNDLED_DEPENDENCIES
							},
							{
								name: 'impact/PagerPage',
								exclude: BUNDLED_DEPENDENCIES
							},
							{
								name: 'scientific/ScientificModuleDependencies',
								exclude: BUNDLED_DEPENDENCIES
							}
						];
					})()
				}
			}
		},
		cssmin: {
			options: {
				report: 'min'
			},
			dist: {
				expand: true,
				cwd: '.tmp',
				dest: '<%= app.dist %>/htdocs',
				src: '**/*.css'
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '<%= app.src %>',
					src: '**/*.html',
					dest: '<%= app.dist %>'
				}]
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true,
				report: 'gzip'
			},
			dist: {
				files: {
					'<%= app.dist %>/htdocs/lib/requirejs/require.js':
							['node_modules/requirejs/require.js'],
					'<%= app.dist %>/htdocs/lib/html5shiv/html5shiv.js':
							['node_modules/html5shiv-dist/html5shiv.js']
				}
			}
		},
		copy: {
			// convert leaflet css into embeddable scss
			leaflet: {
				src: 'node_modules/leaflet/dist/leaflet.css',
				dest: 'node_modules/leaflet/dist/_leaflet.scss'
			},
			leaflet_images: {
				expand: true,
				cwd: 'node_modules/leaflet/dist/images',
				dest: '<%= app.dist %>/htdocs/modules/summary/0-0-1/css/images',
				src: ['*.png']
			},
			app: {
				expand: true,
				cwd: '<%= app.src %>/htdocs',
				dest: '<%= app.dist %>/htdocs',
				src: [
					'img/**/*.{png,gif,jpg,jpeg}',
					'**/*.php',
					'**/*.js'
				]
			},
			conf: {
				expand: true,
				cwd: '<%= app.src %>/conf',
				dest: '<%= app.dist %>/conf',
				src: [
					'**/*',
					'!**/*.orig'
				]
			},
			lib: {
				expand: true,
				cwd: '<%= app.src %>/lib',
				dest: '<%= app.dist %>/lib',
				src: [
					'**/*'
				],
				options: {
					mode: true
				}
			}
		},
		replace: {
			dist: {
				src: [
					'<%= app.dist %>/htdocs/index.html',
					'<%= app.dist %>/**/*.php'
				],
				overwrite: true,
				replacements: [
					{
						from: '<script src="http://<%= connect.options.hostname %>:35729/livereload.js?snipver=1"></script>',
						to: ''
					}
				]
			}
		},
		open: {
			dev: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.dev.options.port %>'
			},
			test: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.test.options.port %>'
			},
			dist: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.dist.options.port %>'
			}
		},
		clean: {
			dist: ['<%= app.dist %>'],
			dev: ['<%= app.tmp %>', '.sass-cache']
		}
	});

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
		'copy:leaflet',
		'concurrent:predist',
		'requirejs:dist',
		'concurrent:dist',
		'copy:leaflet_images',
		'replace',
		'configureRewriteRules',
		'configureProxies',
		'open:dist',
		'connect:dist'
	]);

	grunt.registerTask('default', [
		'clean:dist',
		'copy:leaflet',
		'compass:dev',
		'configureRewriteRules',
		'configureProxies',
		'connect:test',
		'connect:dev',
		'open:test',
		'open:dev',
		'watch'
	]);

};
