'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util');


var DEFAULTS = {
  title: 'Scientific',
  hash: 'scientific',
  cssUrl: 'modules/scientific/index.css',
  pages: [
    {
      className: 'scientific/ScientificSummaryPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Summary',
        hash: 'summary'
      },
      productTypes: [
        'origin',
        'phase-data',
        'moment-tensor',
        'focal-mechanism',
        'finite-fault'
      ]
    },
    {
      className: 'scientific/HypocenterPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Origin',
        hash: 'origin'
      },
      productTypes: [
        'origin',
        'phase-data'
      ]
    },
    {
      className: 'scientific/MomentTensorPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Moment Tensor',
        hash: 'tensor'
      },
      productTypes: ['moment-tensor']
    },
    {
      className: 'scientific/FocalMechanismPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Focal Mechanism',
        hash: 'mechanism'
      },
      productTypes: ['focal-mechanism']
    },
    {
      className: 'scientific/FiniteFaultPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Finite Fault',
        hash: 'finitefault'
      },
      productTypes: ['finite-fault']
    },
    {
      className: 'scientific/IrisProductsPage',
      dependencyBundle: 'modules/scientific/index.js',
      options: {
        title: 'Waveforms',
        hash: 'waveforms'
      }
    }
  ]
};

var ScientificModule = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});
  this._event = options.event;
  EventModule.call(this, options);
};
ScientificModule.prototype = Object.create(EventModule.prototype);


module.exports = ScientificModule;
