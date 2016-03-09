'use strict';

var config = require('./config');


var CWD = process.cwd(),
    NODE_MODULES = CWD + '/node_modules';


var ALL_CLASSES = [
  './' + config.src + '/htdocs/js/core/DownloadView.js:core/DownloadView',
  './' + config.src + '/htdocs/js/general/TextProductView.js:general/TextProductView',
  './' + config.src + '/htdocs/js/shakemap/ShakeMapStationListView.js' +
      ':shakemap/ShakeMapStationListView',
  './' + config.src + '/htdocs/js/pdl/Product.js:pdl/Product',
  './' + config.src + '/htdocs/js/dyfi/DYFIResponsesView.js:' +
      'dyfi/DYFIResponsesView',
  NODE_MODULES + '/hazdev-webutils/src/mvc/View.js:mvc/View',
  NODE_MODULES + '/hazdev-webutils/src/util/Xhr.js:util/Xhr'
];

var BUNDLED_DEPENDENCIES = [
  './' + config.src + '/htdocs/modules/base/Attribution.js:base/Attribution',
  './' + config.src + '/htdocs/modules/base/EventModulePage.js' +
      ':base/EventModulePage',
  './' + config.src + '/htdocs/modules/base/EventUtil.js:base/EventUtil',
  './' + config.src + '/htdocs/modules/base/Formatter.js:base/Formatter',
  './' + config.src + '/htdocs/modules/base/ImpactUtil.js:base/ImpactUtil',
  './' + config.src + '/htdocs/modules/base/SummaryDetailsPage.js' +
      ':base/SummaryDetailsPage',
  './' + config.src + '/htdocs/modules/base/SummaryPage.js:base/SummaryPage',
  NODE_MODULES + '/hazdev-accordion/src/accordion/Accordion.js' +
      ':accordion/Accordion',
  NODE_MODULES + '/hazdev-tablist/src/tablist/TabList.js:tablist/TabList',
  NODE_MODULES + '/hazdev-webutils/src/mvc/Collection.js:mvc/Collection',
  NODE_MODULES + '/hazdev-webutils/src/mvc/DataTable.js:mvc/DataTable',
  NODE_MODULES + '/hazdev-webutils/src/util/Util.js:util/Util',
  NODE_MODULES + '/hazdev-webutils/src/util/Xhr.js:util/Xhr'
];


var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        CWD + '/' + config.src + '/htdocs/js',
        CWD + '/' + config.src + '/htdocs/modules',
        NODE_MODULES + '/hazdev-accordion/src',
        NODE_MODULES + '/hazdev-geoserve-ws/src/htdocs/js',
        NODE_MODULES + '/hazdev-d3/src',
        NODE_MODULES + '/hazdev-location-view/src',
        NODE_MODULES + '/hazdev-question-view/src',
        NODE_MODULES + '/hazdev-svgimagemap/src',
        NODE_MODULES + '/hazdev-tablist/src',
        NODE_MODULES + '/hazdev-webutils/src',
        NODE_MODULES + '/quakeml-parser-js/src'
      ]
    }
  },

  // source bundles
  classes: {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/js/classes.js',
    options: {
      alias: ALL_CLASSES
    }
  },

  'event': {
    src: [config.src + '/htdocs/js/event.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/event.js',
    options: {

    }
  },

  index: {
    src: [config.src + '/htdocs/js/index.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/index.js',
    options: {
      alias: BUNDLED_DEPENDENCIES
    }
  },

  // bundle leaflet externally
  leaflet: {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/lib/leaflet/leaflet.js',
    options: {
      alias: [
        NODE_MODULES + '/leaflet/dist/leaflet-src.js:leaflet'
      ]
    }
  },

  // test bundle
  test: {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      alias: BUNDLED_DEPENDENCIES
    }
  },

  summary: {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/modules/summary/index.js',
    options: {
      alias: [
        // SummaryPage is already bundled in index above
        'summary/ExecutiveSummaryPage',
        'summary/InteractiveMap'
      ].map(function(value) {
        return './' + config.src + '/htdocs/modules/' + value + '.js:' + value;
      }),
      external: BUNDLED_DEPENDENCIES.concat(['leaflet'])
    }
  },

  impact: {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/modules/impact/index.js',
    options: {
      alias: [
        'impact/ImpactSummaryPage',
        'impact/DYFIPage',
        'impact/DYFIFormPage',
        'impact/PagerPage',
        'impact/ShakeMapPage'
      ].map(function(value) {
        return './' + config.src + '/htdocs/modules/' + value + '.js:' + value;
      }),
      external: BUNDLED_DEPENDENCIES.concat(['leaflet'])
    }
  },

  scientific: {
    src: [],
    dest: config.build + '/' + config.src +
        '/htdocs/modules/scientific/index.js',
    options: {
      alias: [
        'scientific/FiniteFaultPage',
        'scientific/FocalMechanismPage',
        'scientific/HypocenterPage',
        'scientific/IrisProductsPage',
        'scientific/MomentTensorPage',
        'scientific/ScientificSummaryPage'
      ].map(function(value) {
        return './' + config.src + '/htdocs/modules/' + value + '.js:' + value;
      }),
      external: BUNDLED_DEPENDENCIES
    }
  }

};


module.exports = browserify;
