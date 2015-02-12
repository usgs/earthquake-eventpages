'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util');


var DEFAULTS = {
  title: 'Impact',
  hash: 'impact',
  cssUrl: 'modules/impact.css',
  dependencyLoader: null,
  pages: [
    {
      className: 'impact/DYFIPage',
      options: {
        title: 'Did You Feel It?',
        hash: 'dyfi'
      },
      productTypes: ['dyfi']
    },
    {
      className: 'impact/DYFIFormPage',
      options: {
        title: 'Tell Us!',
        hash: 'tellus'
      }
    },
    {
      className: 'impact/ShakeMapPage',
      options: {
        title: 'Shakemap',
        hash: 'shakemap'
      },
      productTypes: ['shakemap']
    },
    {
      className: 'impact/PagerPage',
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
