'use strict';

var Attribution = require('core/Attribution'),
    MomentTensorView = require('moment-tensor/MomentTensorView'),
    Util = require('util/Util');


var _DEFAULTS = {
  fillColor: '#ffaa69'
};


/**
 * View for displaying focal mechanisms.
 *
 * Same as MomentTensorView except suppresses axes, and MT specific information.
 *
 * @param options {Object}
 *     see MomentTensorView.
 */
var FocalMechanismView = function (options) {
  var _this;


  _this = MomentTensorView(Util.extend({}, _DEFAULTS, options));


  /**
   * Override getAxes to suppress axis information for focal mechanisms.
   */
  _this.getAxes = function () {
    // don't show any axes information
    return document.createDocumentFragment();
  };

  /**
   * Content for the "info" section of the moment tensor view.
   *
   * @param tensor {Tensor}
   *     the tensor being displayed.
   * @return {DOMElement}
   *     markup for the info section of the moment tensor view.
   */
  _this.getInfo = function (/*tensor*/) {
    var catalog,
        contributor,
        dataSource,
        el,
        product;

    product = _this.model;

    catalog = product.getProperty('eventsource');
    contributor = product.get('source');
    dataSource = product.getProperty('beachball-source') || contributor;

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
   * Override the focal mechanism view title.
   *
   * @param tensor {Tensor}
   *     the tensor being displayed.
   * @return {DOMElement}
   *     markup for the info section of the moment tensor view.
   */
  _this.getTitle = function (/*tensor*/) {
    return document.createDocumentFragment();
  };


  return _this;
};


module.exports = FocalMechanismView;
