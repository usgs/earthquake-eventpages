'use strict';


var Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'scientific-summary';
_TITLE = 'Scientific Summary';
_TYPES = [
  'origin',
  'phase-data',
  'moment-tensor',
  'focal-mechanism',
  'finite-fault',
  'scitech-link'
];

_DEFAULTS = {

};


var ScientificSummaryModule = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();

    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getFiniteFaultTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Finite Fault</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getMechanismTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Focah Mechanism</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getMomentTensorTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Moment Tensor</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getOriginProducts = function (ev) {
    var products;

    if (ev) {
      products = ev.getProducts('origin').map(function (origin) {
        var phase;

        // Find a corresponding phase-data product
        phase = ev.getProduct('phase-data', origin.get('source'),
            origin.get('code'));

        // Prefer the phase-data product if it is at least as new as the origin
        if (phase && phase.get('updateTime') >= origin.get('updateTime')) {
          return phase;
        } else {
          return origin;
        }
      });
    } else {
      products = [];
    }

    return products;
  };

  _this.getOriginTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Origin</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getScitechLinks = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Scientific and Technical Links</h2>');
      // TODO :: Render the list
    }

    return markup.join('');
  };

  _this.render = function () {
    var buf,
        ev,
        faults,
        links,
        mechs,
        origins,
        tensors;

    buf = [];
    ev = _this.model.get('event');

    faults = ev.getProducts('finite-fault');
    links = ev.getProducts('scitech-link');
    mechs = ev.getProducts('focal-mechanism');
    origins = _this.getOriginProducts(ev);
    tensors = ev.getProducts('moment-tensor');

    buf.push(_this.getOriginTable(origins));
    buf.push(_this.getMomentTensorTable(tensors));
    buf.push(_this.getFocalMechanismTable(mechs));
    buf.push(_this.getFiniteFaultTable(faults));
    buf.push(_this.getScitechLinks(links));

    _this.header.innerHTML = '';
    _this.content.innerHTML = buf.join('');
    _this.footer.innerHTML = '';
  };
};


ScientificSummaryModule.ID = _ID;
ScientificSummaryModule.TITLE = _TITLE;
ScientificSummaryModule.TYPES = _TYPES;


module.exports = ScientificSummaryModule;
