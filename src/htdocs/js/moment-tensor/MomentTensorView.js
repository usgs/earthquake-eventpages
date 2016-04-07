'use strict';

var Attribution = require('core/Attribution'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    Formatter = require('core/Formatter'),
    ProductView = require('core/ProductView'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS = {
  empty: '&ndash;',
  fillColor: '#6ea8ff',
  formatter: null,
  tensor: null
};

var _R2D = 180 / Math.PI;


/**
 * View for a `moment-tensor` product.
 *
 * @param options {Object}
 * @param options.empty {String}
 *     string to display if a value is missing.
 *     default '&ndash;'.
 * @param options.fillColor {String}
 *     fill color for beachball.
 *     default '#6ea8ff'.
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
      _fillColor,
      _formatter,
      _tensor;


  _this = ProductView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
    _empty = options.empty;
    _fillColor = options.fillColor;
    _formatter = options.formatter || Formatter();
    _tensor = Tensor.fromProduct(_this.model);
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _empty = null;
    _fillColor = null;
    _formatter = null;
    _initialize = null;
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
  _this.getAxes = function (tensor) {
    var el,
        formatAxis,
        fragment;

    formatAxis = function (axis, name) {
      var azimuth,
          plunge,
          value;

      azimuth = (Math.PI / 2) - axis.azimuth();
      plunge = axis.plunge();
      value = axis.eigenvalue / tensor.scale;
      // make sure plunge is down
      if (plunge < 0) {
        azimuth = azimuth + Math.PI;
        plunge = plunge * -1;
      }
      azimuth = BeachBallView.zeroToTwoPi(azimuth);

      // format values
      azimuth = Math.round(azimuth * _R2D) + '&deg;';
      plunge = Math.round(plunge * _R2D) + '&deg';
      value = value.toFixed(3) + 'e+' + tensor.exponent + ' ' + tensor.units;

      return '<tr>' +
          '<th scope="row">' + name + '</th>' +
          '<td>' + value + '</td>' +
          '<td>' + plunge + '</td>' +
          '<td>' + azimuth + '</td>' +
          '</tr>';
    };

    fragment = document.createDocumentFragment();

    el = document.createElement('h4');
    el.innerHTML = 'Principal Axes';
    fragment.appendChild(el);

    el = document.createElement('div');
    el.classList.add('horizontal-scrolling');
    el.innerHTML =
        '<table>' +
          '<thead>' +
            '<tr>' +
              '<th>Axis</th>' +
              '<th>Value</th>' +
              '<th>Plunge</th>' +
              '<th>Azimuth</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            formatAxis(tensor.T, 'T') +
            formatAxis(tensor.N, 'N') +
            formatAxis(tensor.P, 'P') +
          '</tbody>' +
        '</table>';
    fragment.appendChild(el);

    return fragment;
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
    depth = _formatter.depth(tensor.depth, 'km');
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
    percentDC = Math.round(tensor.percentDC * 100) + ' %';

    catalog = catalog.toUpperCase();
    contributor = Attribution.getContributorReference(contributor);
    dataSource = Attribution.getContributorReference(dataSource);

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
  _this.getPlanes = function (tensor) {
    var el,
        formatPlane,
        fragment;

    formatPlane = function (plane, name) {
      var dip,
          rake,
          strike;

      dip = Math.round(plane.dip) + '&deg;';
      rake = Math.round(plane.rake) + '&deg;';
      strike = Math.round(plane.strike) + '&deg';

      return '<tr>' +
          '<th scope="row">' + name + '</th>' +
          '<td>' + strike + '</td>' +
          '<td>' + dip + '</td>' +
          '<td>' + rake + '</td>' +
        '</tr>';
    };

    fragment = document.createDocumentFragment();

    el = document.createElement('h4');
    el.innerHTML = 'Nodal Planes';
    fragment.appendChild(el);

    el = document.createElement('div');
    el.classList.add('horizontal-scrolling');
    el.innerHTML =
        '<table>' +
          '<thead>' +
            '<tr>' +
            '<th>Plane</th>' +
            '<th>Strike</th>' +
            '<th>Dip</th>' +
            '<th>Rake</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            formatPlane(tensor.NP1, 'NP1') +
            formatPlane(tensor.NP2, 'NP2') +
          '</tbody>' +
        '</table>';
    fragment.appendChild(el);

    return fragment;
  };

  /**
   * Get the title for this tensor.
   *
   * @param tensor {Tensor}
   *     tensor object.
   * @return {DOMElement}
   *     title for view.
   */
  _this.getTitle = function (tensor) {
    var el,
        title,
        type;

    type = tensor.type;
    if (type !== null) {
      // use derived magnitude type
      type = type.toUpperCase();
      if (type === 'MWW') {
        title = 'W-phase Moment Tensor (Mww)';
      } else if (type === 'MWC') {
        title = 'Centroid Moment Tensor (Mwc)';
      } else if (type === 'MWB') {
        title = 'Body-wave Moment Tensor (Mwb)';
      } else if (type === 'MWR') {
        title = 'Regional Moment Tensor (Mwr)';
      }
    }

    if (!title) {
      if (type !== null) {
        title = 'Moment Tensor (' + tensor.type + ')';
      } else {
        title = 'Moment Tensor';
      }
    }

    el = document.createElement('h3');
    el.innerHTML = title;

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

    el = _this.el;
    el.innerHTML =
        '<section class="moment-tensor-view">' +
          '<header class="title"></header>' +
          '<div class="row">' +
            '<div class="column one-of-two"></div>' +
            '<div class="column one-of-two"></div>' +
          '</div>' +
        '</section>';
    title = el.querySelector('.title');
    info = el.querySelector('.column');
    beachball = el.querySelector('.column + .column');

    title.appendChild(_this.getTitle(_tensor));

    info.appendChild(_this.getInfo(_tensor));
    info.appendChild(_this.getPlanes(_tensor));
    info.appendChild(_this.getAxes(_tensor));

    beachball = BeachBallView({
      el: beachball,
      fillColor: _fillColor,
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
