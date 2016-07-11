'use strict';


var ForecastView = require('oaf/ForecastView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var ModelDetailsView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ForecastView(options);

  _initialize = function (/*options*/) {

  };


  _this.destroy = Util.compose(function () {

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.renderForecast = function () {
    var model;

    // This is the aftershock mathematical model and has nothing to do with MVC
    model = _this.forecast.model;

    _this.el.innerHTML = [
      '<h3>', model.name, '</h3>',
      '<p>',
        'Reference Link: ',
        '<a href="', model.reference, '">', model.reference, '</a>',
      '</p>',
      '<table class="oaf-model-parameters">',
        '<tbody>',
          Object.keys(model.parameters).reduce(function (markup, key) {
            markup.push('<tr><th scope="row">' + key + '</th>' +
                '<td>' + model.parameters[key] + '</td></tr>');

            return markup;
          }, []).join(''),
        '</tbody>',
      '</table>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ModelDetailsView;
