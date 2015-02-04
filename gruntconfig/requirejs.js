'use strict';

var config = require('./config');

var requirejs = {
  dist: {
    options: {
      appDir: config.src + '/htdocs',
      baseUrl: 'js',
      dir: config.dist + '/htdocs',
      useStrict: true,
      wrap: false,
      fileExclusionRegExp: /(^\.|\.scss$)/,

      paths: {
        leaflet: '../../../node_modules/leaflet/dist/leaflet-src',
        mvc: '../../../node_modules/hazdev-webutils/src/mvc',
        util: '../../../node_modules/hazdev-webutils/src/util',
        tablist: '../../../node_modules/hazdev-tablist/src/tablist',
        svgimagemap: '../../../node_modules/hazdev-svgimagemap/src/svgimagemap',
        quakeml: '../../../node_modules/quakeml-parser-js/src/quakeml',
        theme: '../../../node_modules/hazdev-template/src/htdocs/js',
        questionview: '../../../node_modules/hazdev-question-view/src',
        locationview: '../../../node_modules/hazdev-location-view/src',
        accordion: '../../../node_modules/hazdev-accordion/src',

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
          'accordion/Accordion',
          'base/EventModulePage',
          'base/EventModulePages',
          'base/SummaryDetailsPage',
          'base/ContentsXML',
          'base/Formatter',
          'base/EventPage',
          'base/EventModulePage',
          'base/Attribution',
          'mvc/Collection',
          'mvc/Model',
          'mvc/View',
          'mvc/ModalView',
          'util/Util',
          'util/Xhr',
          'util/Events',
          'accordion/Accordion'
        ];
        return [
          {
            name: 'index',
            include: BUNDLED_DEPENDENCIES,
            exclude: [
              // provided by event page
              'EventDetails',
              // provided by event page
              'EventConfig',
              // provided by template
              'theme/OffCanvas'
            ]
          },
          {
            name: 'summary/InteractiveMap',
            exclude: BUNDLED_DEPENDENCIES.concat(['leaflet'])
          },
          {
            name: 'impact/DYFIPage',
            exclude: BUNDLED_DEPENDENCIES
          },
          {
            name: 'impact/DYFIFormPage',
            exclude: BUNDLED_DEPENDENCIES.concat(['leaflet'])
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
          },
          {
            name: 'unknown',
            include: BUNDLED_DEPENDENCIES,
            exclude: [
              // provided by event page
              'EventDetails',
              // provided by event page
              'EventConfig',
              // provided by template
              'theme/OffCanvas'
            ]
          }
        ];
      })()
    }
  }
};

module.exports = requirejs;
