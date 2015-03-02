'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util'),

    FiniteFaultPage = require('./FiniteFaultPage'),
    FocalMechanismPage = require('./FocalMechanismPage'),
    HypocenterPage = require('./HypocenterPage'),
    IrisProductsPage = require('./IrisProductsPage'),
    MomentTensorPage = require('./MomentTensorPage'),
    ScientificSummaryPage = require('./ScientificSummaryPage');


var DEFAULTS = {
  title: 'Scientific',
  hash: 'scientific',
  cssUrl: 'modules/scientific/index.css',
  pages: [
    {
      factory: ScientificSummaryPage,
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
      factory: HypocenterPage,
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
      factory: MomentTensorPage,
      options: {
        title: 'Moment Tensor',
        hash: 'tensor'
      },
      productTypes: ['moment-tensor']
    },
    {
      factory: FocalMechanismPage,
      options: {
        title: 'Focal Mechanism',
        hash: 'mechanism'
      },
      productTypes: ['focal-mechanism']
    },
    {
      factory: FiniteFaultPage,
      options: {
        title: 'Finite Fault',
        hash: 'finitefault'
      },
      productTypes: ['finite-fault']
    },
    {
      factory: IrisProductsPage,
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
