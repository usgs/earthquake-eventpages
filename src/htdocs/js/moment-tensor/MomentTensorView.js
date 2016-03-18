'use strict';

var BeachBallView = require('moment-tensor/BeachBallView'),
    Formatter = require('core/Formatter'),
    ProductView = require('core/ProductView'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS = {
  empty: '&ndash;',
  formatter: null,
  tensor: null
};

/**
 * View for a `moment-tensor` product.
 *
 * @param options {Object}
 * @param options.empty {String}
 *     string to display if a value is missing.
 *     default '&ndash;'.
 * @param options.formatter {Formatter}
 *     formatter object.
 *     default `Formatter()`.`
 * @param options.model {Product}
 *     moment-tensor product to display.
 */
var MomentTensorView = function (options) {
  var _this,
      _initialize,

      _empty,
      _formatter,
      _tensor;


  _this = ProductView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
    _empty = options.empty;
    _formatter = options.formatter || Formatter();
    _tensor = Tensor.fromProduct(_this.model);
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (!_this) {
      // already destroyed
      return;
    }

    _empty = null;
    _formatter = null;
    _initialize = null;
    _tensor.destroy();
    _tensor = null;
    _this = null;
  }, _this.destroy);

  /**
   * Content for the "axes" section of the moment tensor view.
   *
   * @param tensor {Tensor}
   *     the tensor being displayed.
   * @return {DOMElement}
   *     markup for the axes section of the moment tensor view.
   */
  _this.getAxes = function (/*tensor*/) {
    var el;

    el = document.createElement('h4');
    el.innerHTML = 'Axes';

    return el;
  };

  /**
   * Content for the "info" section of the moment tensor view.
   *
   * @param tensor {Tensor}
   *     the tensor being displayed.
   * @return {DOMElement}
   *     markup for the info section of the moment tensor view.
   */
  _this.getInfo = function (tensor) {
    var catalog,
        contributor,
        dataSource,
        depth,
        el,
        halfDuration,
        magnitude,
        moment,
        percentDC,
        product;

    product = _this.model;

    catalog = product.getProperty('eventsource');
    contributor = product.get('source');
    dataSource = product.getProperty('beachball-source') || contributor;
    depth = _formatter.depth(product.getProperty('depth') / 1000, 'km');
    halfDuration = product.getProperty('duration');
    if (halfDuration) {
      halfDuration = (halfDuration / 2) + ' s';
    } else {
      halfDuration = _empty;
    }
    magnitude = _formatter.magnitude(
        tensor.magnitude,
        product.getProperty('derived-magnitude-type') || '');
    moment = (tensor.moment / tensor.scale).toFixed(3) +
        'e+' + tensor.exponent + ' ' + tensor.units;
    percentDC = Math.round(tensor.percentDC * 100) + '%';

    el = document.createElement('div');
    el.classList.add('moment-tensor-info');
    el.classList.add('horizontal-scrolling');
    el.innerHTML =
        '<table>' +
        '<tbody>' +
          '<tr>' +
            '<th scope="row">Moment</th></th>' +
            '<td>' + moment + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Magnitude</th>' +
            '<td>' + magnitude + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Depth</th>' +
            '<td>' + depth + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">' +
              'Percent <abbr title="Double Couple">DC</abbr>' +
            '</th>' +
            '<td>' + percentDC + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Half Duration</th>' +
            '<td>' + halfDuration + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Catalog</th>' +
            '<td>' + catalog + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Data Source</th>' +
            '<td>' + dataSource + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Contributor</th>' +
            '<td>' + contributor + '</td>' +
          '</tr>' +
        '</tbody>' +
        '</table>';

    return el;
  };

  /**
   * Content for the "planes" section of the moment tensor view.
   *
   * @param tensor {Tensor}
   *     the tensor being displayed.
   * @return {DOMElement}
   *     markup for the info section of the moment tensor view.
   */
  _this.getPlanes = function (/*tensor*/) {
    var el;

    el = document.createElement('h4');
    el.innerHTML = 'Planes';

    return el;
  };

  /**
   * Get the title for this tensor.
   *
   * @param tensor {Tensor}
   *     tensor object.
   * @return {DOMElement}
   *     title for view.
   */
  _this.getTitle = function (/*tensor*/) {
    var el;

    el = document.createElement('h3');
    el.innerHTML = 'Title';

    return el;
  };

  /**
   * Render view.
   */
  _this.render = function () {
    var el,
        beachball,
        info,
        title;

    el = document.createElement('section');
    el.classList.add('moment-tensor-view');
    el.innerHTML = '<section class="moment-tensor-view">' +
        '<header class="title"></header>' +
        '<div class="row">' +
          '<div class="column one-of-two"></div>' +
          '<div class="column one-of-two"></div>' +
        '</div>' +
        '</section>';
    title = el.querySelector('.title');
    info = el.querySelector('.column');
    beachball = el.querySelector('.column + .column');
    _this.el.appendChild(el);

    title.appendChild(_this.getTitle(_tensor));

    info.appendChild(_this.getInfo(_tensor));
    info.appendChild(_this.getPlanes(_tensor));
    info.appendChild(_this.getAxes(_tensor));

    beachball = BeachBallView({
      el: beachball,
      fillColor: '#6ea8ff',
      size: 320,
      tensor: _tensor
    });
    beachball.render();
    beachball.destroy();
    beachball = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = MomentTensorView;
