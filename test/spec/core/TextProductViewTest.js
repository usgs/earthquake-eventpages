/* global before, chai, describe, it */
'use strict';


var Model = require('mvc/Model'),
    Product = require('pdl/Product'),
    TextProductView = require('core/TextProductView');


var expect = chai.expect;


var generalTextInfo = {
  contents: {
    '': {
      'contentType': 'text/plain',
      'length': 'some text'.length,
      'lastModified': 1234,
      'bytes': 'some text'
    }
  }
};

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



describe('core/TextProductView', function () {
  var generalProduct,
      scitechProduct;


  before(function () {
    generalProduct = Product(generalTextInfo);
    scitechProduct = Product(scitechTextInfo);
  });


  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof TextProductView).to.equal('function');
    });
  });

  describe('onError', function () {
    it('should contain an error message', function () {
      var view;

      view = TextProductView({
        el: document.createElement('div'),
        model: generalProduct
      });

      view.onError();

      /* jshint -W030 */
      expect(view.el.querySelector('.error')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onSuccess', function () {
    it('displays simple data', function () {
      var view;

      view = TextProductView({
        el: document.createElement('div'),
        model: generalProduct
      });

      view.onSuccess(generalTextInfo.contents[''].bytes);

      expect(view.el.innerHTML).to.equal(generalTextInfo.contents[''].bytes);
    });

    it('replaces relative paths', function () {
      var view;

      view = TextProductView({
        el: document.createElement('div'),
        model: scitechProduct
      });

      view.onSuccess(scitechTextInfo.contents[''].bytes);

      expect(view.el.querySelector('img').getAttribute('src')).to.equal(
          '/products/scitech-text/usp000hvnu-1455229215593/admin/' +
          '1455230870084/kur999_base.png');
    });
  });


  describe('replaceRelativePaths', function () {
    var view;

    before(function () {
      view = TextProductView({
        el: document.createElement('div'),
        model: generalProduct
      });
    });

    it('replaces all path instances', function () {
      var result;

      result = view.replaceRelativePaths(
          '"foo" "bar" "foo" "bar" "foo"', [Model({id: 'foo', url: 'bar'})]);

      expect(result).to.equal('"bar" "bar" "bar" "bar" "bar"');
    });
  });
});
