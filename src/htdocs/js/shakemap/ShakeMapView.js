'use strict';

var InteractiveMapView = require('map/InteractiveMapView'),
    ProductView = require('core/ProductView'),
    ShakeMapInfoView = require('shakemap/ShakeMapInfoView'),
    ShakeMapStationListView = require('shakemap/ShakeMapStationListView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var ShakeMapView = function (options) {
  var _this,
      _initialize,

      _shakeMapInfoView,
      _shakeMapStationListView,
      _tablist;

  _this = ProductView(options);

  _initialize = function () {
    _this.el.classList.add('shakemap');
  };

  /**
   * Create tab content for all PSA images (PSA 0.3, 1.0, 3.0)
   *
   * @param  {Product} shakemap
   *    shakemap product with PSA image contents
   *
   * @return {string} markup
   *    HTML markup for PSA tab contents
  **/
  _this.createPSATabListImages = function (shakemap) {
    var header,
        markup,
        psa03,
        psa10,
        psa30;

    header = [];
    markup = [];
    psa03 = shakemap.getContent('download/psa03.jpg');
    psa10 = shakemap.getContent('download/psa10.jpg');
    psa30 = shakemap.getContent('download/psa30.jpg');

    if (psa03) {
      header.push('0.3 s');
      markup.push(_this.createTabListImage(psa03,
          'ShakeMap Peak Spectral Acceleration 0.3 s image'));
    }

    if (psa10) {
      header.push('1.0 s');
      markup.push(_this.createTabListImage(psa10,
          'ShakeMap Peak Spectral Acceleration 1.0 s image'));
    }

    if (psa30) {
      header.push('3.0 s');
      markup.push(_this.createTabListImage(psa30,
          'ShakeMap Peak Spectral Acceleration 3.0 s image'));
    }

    return '<h3>' +
        'Peak Spectral Acceleration (%g) for ' + header.join(', ') +
        '</h3>' +
        markup.join('');
  };

  /**
   * Generate tab contents for tablist
   *
   * @param  {Product} shakemap,
   *         shakemap product with contents
   */
  _this.createTabListData = function (shakemap) {
    var intensityContent,
        pgaContent,
        pgvContent,
        shakeMapInfoContent,
        stationListContent,
        uncertaintyContent;

    // Intesity Image
    intensityContent = shakemap.getContent('download/intensity.jpg');
    if (intensityContent) {
      _tablist.addTab({
        title: 'Intensity',
        content: _this.createTabListImage(intensityContent,
            'ShakeMap Intensity image')
      });
    }

    // PGA Image
    pgaContent = shakemap.getContent('download/pga.jpg');
    if (pgaContent) {
      _tablist.addTab({
        title: '<abbr title="Peak Ground Acceleration">PGA</abbr>',
        content: _this.createTabListImage(pgaContent,
            'ShakeMap Peak Ground Acceleration image')
      });
    }

    // PGV Image
    pgvContent = shakemap.getContent('download/pgv.jpg');
    if (pgvContent) {
      _tablist.addTab({
        title: '<abbr title="Peak Ground Velocity">PGV</abbr>',
        content: _this.createTabListImage(pgvContent,
            'ShakeMap Peak Ground Velocity image')
      });
    }

    // StationList
    stationListContent = shakemap.getContent('download/stationlist.json');
    if (stationListContent) {
      _shakeMapStationListView = ShakeMapStationListView({
            el: document.createElement('div'),
            model: stationListContent
          });
      _tablist.addTab({
        title: 'Station List',
        content: function () {
          _shakeMapStationListView.render();
          return _shakeMapStationListView.el;
        }
      });
    }

    // Info
    shakeMapInfoContent = shakemap.getContent('download/info.json');
    if (shakeMapInfoContent) {
      _shakeMapInfoView = ShakeMapInfoView({
        el: document.createElement('div'),
        model: shakeMapInfoContent
      });
      _tablist.addTab({
        title: 'Metadata',
        content: function () {
          _shakeMapInfoView.render();
          return _shakeMapInfoView.el;
        }
      });
    }

    // Uncertainty Image
    uncertaintyContent = shakemap.getContent('download/sd.jpg');
    if (uncertaintyContent) {
      _tablist.addTab({
        title: 'Uncertainty',
        content: _this.createTabListImage(uncertaintyContent,
            'ShakeMap Uncertainty image')
      });
    }

    // PSA Images
    if (shakemap.getContent('download/psa03.jpg') ||
        shakemap.getContent('download/psa10.jpg') ||
        shakemap.getContent('download/psa30.jpg')) {
      _tablist.addTab({
        title: '<abbr title="Peak Spectral Acceleration">PSA</abbr>',
        content: _this.createPSATabListImages(shakemap)
      });
    }
  };

  /**
   * Create combined link/image for tablist image.
   *
   * @param  {Content} content
   *         shakemap Content object with an url property
   *
   * @return {string} link
   *         image link to interactive map.
  **/
  _this.createTabListImage = function (content, alt) {
    var link;

    if (!content.get('url')) {
      return '';
    }

    // In addition to contours (default), enable stations
    link = '<a href="#map?' + InteractiveMapView.SHAKEMAP_STATIONS + '=true">' +
        '<img' +
          ' src="' + content.get('url') + '"' +
          ' alt="' + alt + '"' +
        '/>' +
        '</a>';

    return link;
  };

  _this.destroy = Util.compose(function () {
    // Destroy tablist
    if (_tablist) {
      _tablist.destroy();
      _tablist = null;
    }

    if (_shakeMapInfoView) {
      _shakeMapInfoView.destroy();
      _shakeMapInfoView = null;
    }

    // Destrop ShakeMapStationList
    if (_shakeMapStationListView) {
      _shakeMapStationListView.destroy();
      _shakeMapStationListView = null;
    }

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.render = function () {
    var el,
        shakemap;

    el = _this.el;
    shakemap = _this.model;

    if (shakemap.isDeleted()) {
      el.innerHTML = '<p class="alert info">Product Deleted</p>';
    } else {
      // Build TabList with all of the shakemap images
      _tablist = new TabList({
        el: el,
        tabPosition: 'top',
        tabs: []
      });
      _this.createTabListData(shakemap);
    }
  };

  _initialize();
  options = null;
  return _this;
};

module.exports = ShakeMapView;
