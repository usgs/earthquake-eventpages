'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util'),

    DYFIPage = require('./DYFIPage'),
    PagerPage = require('./PagerPage'),
    ShakeMapPage = require('./ShakeMapPage');


var DEFAULTS = {
  title: 'Impact',
  hash: 'impact',
  cssUrl: 'modules/impact/index.css',
  pages: [
    {
      factory: DYFIPage,
      options: {
        title: 'Did You Feel It?',
        hash: 'dyfi'
      },
      productTypes: ['dyfi']
    },
    {
      // "impact/DYFIFormPage" is an alias in gruntconfig/browserify
      className: 'impact/DYFIFormPage',
      dependencyBundle: 'lib/leaflet/leaflet.js',
      options: {
        title: 'Tell Us!',
        hash: 'tellus'
      }
    },
    {
      factory: ShakeMapPage,
      options: {
        title: 'Shakemap',
        hash: 'shakemap'
      },
      productTypes: ['shakemap']
    },
    {
      factory: PagerPage,
      options: {
        title: 'PAGER',
        hash: 'pager'
      },
      productTypes: ['losspager']
    }
  ]
};


var ImpactModule = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});

  EventModule.call(this, options);
};
ImpactModule.prototype = Object.create(EventModule.prototype);


module.exports = ImpactModule;
