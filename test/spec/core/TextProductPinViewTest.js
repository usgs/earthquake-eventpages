/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';


var Product = require('pdl/Product'),
    TextProductPinView = require('core/TextProductPinView');

var expect = chai.expect;

var scitechTextInfo = {
  contents: {
    '': {
      'contentType': '1',
      'lastModified': 1455230870000,
      'length': 569,
      'bytes': '<h2>Subduction Zone Geometry Analysis</h2>' +
          '<p><strong>Most Likely Geometry: Strike = 194.89, Dip = 14.94 ' +
          '</strong></p> <figure class="left"> <img src="kur999_base.png" ' +
          'max-width="550" alt=""/> <figcaption> Basemap of subduction ' +
          'zone showing the area of the trench constrained in this example. ' +
          'Earthquake locations from the gCMT catalog and EHB catalog (gray ' +
          'circles, sized according to magnitude) are shown. Maroon ' +
          'rectangle indicates the area shown in cross section (c); all ' +
          'earthquakes within this area may be used to constrain trench ' +
          'geometry. </figcaption> </figure>'
    },
    'kur999_base.png': {
      contentType: 'image/png',
      lastModified: 1455229051000,
      length: 608735,
      url: '/products/scitech-text/usp000hvnu-1455229215593/admin/' +
          '1455230870084/kur999_base.png'
    }
  }
};

describe('core/TextProductPinView', function () {
  var product,
      textProductPinView;

  afterEach(function () {
    textProductPinView.destroy();
  });

  beforeEach(function () {
    product = Product(scitechTextInfo);
    textProductPinView = TextProductPinView({
      el: document.createElement('div'),
      model: product,
      module: {ID: 'scitech-text', TITLE: 'Scitech Text'}
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof TextProductPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(TextProductPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('render', function () {
    it('renders text product contents', function () {
      var productView,
          spy;

      productView = textProductPinView.textProductView;
      spy = sinon.spy(productView, 'render');
      textProductPinView.renderPinContent();

      expect(spy.callCount).to.equal(1);
    });
  });

  describe('onClick', function () {
    it('shows text product contents in modal', function () {
      textProductPinView.onClick();
      expect(textProductPinView.dialog).to.not.equal(null);
    });
  });

});
