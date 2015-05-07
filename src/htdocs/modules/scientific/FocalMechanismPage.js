'use strict';

var Attribution = require('base/Attribution'),
    Util = require('util/Util'),

    MomentTensorPage = require('./MomentTensorPage'),
    Tensor = require('./tensor/Tensor');


var DEFAULTS = {
  markPreferred: false
};

/**
 * Construct a new FocalMechanismPage.
 *
 * @param options {Object}
 *        module options.
 * @see MomentTensorPage.
 */
var FocalMechanismPage = function (options) {
  options = Util.extend({}, DEFAULTS, options);
  this._code = options.code;
  MomentTensorPage.call(this, options);
};

// extend MomentTensorPage
FocalMechanismPage.prototype = Object.create(MomentTensorPage.prototype);


FocalMechanismPage.prototype._getSummaryMarkup = function (product) {
  var tensor = Tensor.fromProduct(product),
      np1 = tensor.NP1,
      np2 = tensor.NP2;

  return [
        '<ul>',
          '<li class="image">',
            '<img src="', this.getBeachball(tensor), '" ',
                'alt="Focal Mechanism Beachball (' + tensor.code + ')"/>',
          '</li>',
          '<li>',
            '<span>',
              '(',
              Math.round(np1.strike), '<i>,</i>',
              Math.round(np1.dip), '<i>,</i>',
              Math.round(np1.rake),
              ')',
            '</span>',
            '<abbr title="Nodal Plane 1">',
              'Strike<i>,</i>Dip<i>,</i>Rake</abbr>',
            '</abbr>',
          '</li>',
          '<li>',
            '<span>',
              '(',
              Math.round(np2.strike), '<i>,</i>',
              Math.round(np2.dip), '<i>,</i>',
              Math.round(np2.rake),
              ')',
            '</span>',
            '<abbr title="Nodal Plane 2">',
              'Strike<i>,</i>Dip<i>,</i>Rake</abbr>',
            '</abbr>',
          '</li>',
          '<li class="summary-hide">',
            Attribution.getContributorReference(tensor.source),
            '<abbr title="', Attribution.getName(tensor.source),
                '">Source</abbr>',
          '</li>',
        '</ul>',
  ].join('');
};

/**
 * Mechanism info.
 *
 * @param tensor {Tensor}
 *        the focal-mechanism product.
 * @return {String} info table.
 */
FocalMechanismPage.prototype._getInfo = function (tensor) {
  return [
    '<table class="tabular info-table"><tbody>',
    '<tr><th scope="row">Catalog</th><td>',
      this.getCatalogDetail(tensor.product), '</td></tr>',
    '<tr><th scope="row">Data Source</th><td>',
      Attribution.getContributorReference(tensor.source), '</td></tr>',
    '<tr><th scope="row">Contributor</th><td>',
      Attribution.getContributorReference(tensor.product.source), '</td></tr>',
    '</tbody></table>'
  ].join('');
};

/**
 * Mechanism Axes information.
 *
 * @return {String} empty string, don't show axes for mechanism.
 */
FocalMechanismPage.prototype._getAxes = function () {
  return '';
};

/**
 * Format focal mechanism title.
 *
 * @param tensor {Tensor}
 *        tensor to format.
 * @return {String} title for focal mechanism detail area.
 */
FocalMechanismPage.prototype._getTitle = function () {
  return '';
};


module.exports = FocalMechanismPage;
