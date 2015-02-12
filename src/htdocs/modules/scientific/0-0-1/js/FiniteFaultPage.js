/* global define */
define([
  'util/Util',
  'util/Xhr',
  'base/Attribution',
  'base/SummaryDetailsPage'
], function (
  Util,
  Xhr,
  Attribution,
  SummaryDetailsPage
) {
  'use strict';


  /**
   * Construct a new FiniteFaultPage.
   *
   * @param options {Object}
   *        page options.
   * @see base/SummaryDetailsPage for additional options.
   */
  var FiniteFaultPage = function (options) {
    options = Util.extend({}, options, {
      productType: 'finite-fault'
    });
    SummaryDetailsPage.call(this, options);
  };

  FiniteFaultPage.prototype = Object.create(SummaryDetailsPage.prototype);


  /**
   * Finite fault products have broken contents.xml, embed html instead.
   *
   * @param product {Object}
   *        finite-fault product.
   * @return {DOMElement} that is updated to contain html content.
   */
  FiniteFaultPage.prototype.getDetailsContent = function (product) {
    var el = document.createElement('div'),
        path = product.properties.eventsourcecode + '.html',
        content = product.contents[path],
        url,
        baseURL;

    if (content) {
      // compute absolute base url
      url = content.url;
      baseURL = url.replace(path, '');
      // load content
      Xhr.ajax({
        url: url,
        success: function (data) {
          // make all content urls absolute instead of relative
          var path;
          for (path in product.contents) {
            data = data.replace('"' + path + '"', baseURL + path);
          }
          // insert content
          el.innerHTML = '<small class="attribution">Data Source ' +
              Attribution.getContributorReference(product.source) +
              '</small>' +
              data;
        }
      });
    }

    this._content.appendChild(el);
  };


  // return constructor
  return FiniteFaultPage;
});
