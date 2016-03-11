/* global beforeEach, chai, describe, it */
'use strict';

var Product = require('pdl/Product'),
    ShakeMapView = require('shakemap/ShakeMapView');

var expect = chai.expect;

var shakemap = Product({
      source: 'us',
      code: 'usc000myqq',
      status: 'UPDATE',
      properties: {},
      contents: {
        'download/intensity.jpg': {url: 'intensity.jpg'},
        'download/pga.jpg': {url: 'pga.jpg'},
        'download/pgv.jpg': {url: 'pgv.jpg'},
        'download/psa03.jpg': {url: 'psa03.jpg'},
        'download/psa10.jpg': {url: 'psa10.jpg'},
        'download/psa30.jpg': {url: 'psa30.jpg'},
        'download/sd.jpg': {url: 'sd.jpg'},
        'download/stationlist.json': {url:'stationlist.json'},
      }
    });

describe('shakemap/ShakeMapView', function () {
  var shakeMapView;

  beforeEach(function () {
    shakeMapView = ShakeMapView({
      el: document.createElement('div'),
      model: shakemap
    });
    shakeMapView.render();
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof ShakeMapView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(ShakeMapView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('createTabListData', function () {
    it('contains all images and station list', function () {
      var tablistPanels;
      tablistPanels = shakeMapView.el.querySelectorAll('.tablist-panel');
      expect(tablistPanels.length).to.be.equal(6);
    });
  });

  describe('createPSATabListImages', function () {
    it('returns all PSA images', function () {
      var contents,
          markup,
          psaContents;

      contents = shakemap.get('contents');
      psaContents = [
          {
            title: 'PSA 0.3s (%g)',
            url: contents.get('download/psa03.jpg').get('url')
          },
          {
            title: 'PSA 1.0s (%g)',
            url: contents.get('download/psa10.jpg').get('url')
          },
          {
            title: 'PSA 3.0s (%g)',
            url: contents.get('download/psa30.jpg').get('url')
          }
        ];

      markup = shakeMapView.createPSATabListImages(psaContents);

      expect(markup.match(/img/g).length).to.equal(3);
    });
  });

  describe('createTabLIstImage', function () {
    it('returns HTML markup for a content image', function () {
      var content,
          markup;

      content = shakemap.getContent('download/sd.jpg');
      markup = shakeMapView.createTabListImage(content.get('url'));

      expect(markup.indexOf(content.get('url'))).to.not.equal(-1);

    });
  });

});