'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util');


var DEFAULTS = {
  title: 'Impact',
  hash: 'impact',
  cssUrl: 'modules/impact/index.css',
  pages: [
    {
      className: 'impact/DYFIPage',
      dependencyBundle: 'modules/impact/index.js',
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
      className: 'impact/ShakeMapPage',
      dependencyBundle: 'modules/impact/index.js',
      options: {
        title: 'Shakemap',
        hash: 'shakemap'
      },
      productTypes: ['shakemap']
    },
    {
      className: 'impact/PagerPage',
      dependencyBundle: 'modules/impact/index.js',
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
