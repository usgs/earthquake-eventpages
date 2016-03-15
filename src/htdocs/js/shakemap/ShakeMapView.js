'use strict';

var ProductView = require('core/ProductView'),
    ShakeMapStationListView = require('shakemap/ShakeMapStationListView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var ShakeMapView = function (options) {
  var _this,
      _initialize;

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
    var markup,
        psa03,
        psa10,
        psa30;

    markup = [];
    psa03 = shakemap.getContent('download/psa03.jpg');
    psa10 = shakemap.getContent('download/psa10.jpg');
    psa30 = shakemap.getContent('download/psa30.jpg');

    if (psa03) {
      markup.push('<h3>PSA 0.3 s (%g)</h3>');
      markup.push(_this.createTabListImage(psa03));
    }

    if (psa10) {
      markup.push('<h3>PSA 1.0 s (%g)</h3>');
      markup.push(_this.createTabListImage(psa10));
    }

    if (psa30) {
      markup.push('<h3>PSA 3.0 s (%g)</h3>');
      markup.push(_this.createTabListImage(psa30));
    }

    return markup.join('');
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
      _this.tablist.addTab({
        title: 'Intensity',
        content: _this.createTabListImage(intensityContent)
      });
    }

    // PGA Image
    pgaContent = shakemap.getContent('download/pga.jpg');
    if (pgaContent) {
      _this.tablist.addTab({
        title: 'PGA (%g)',
        content: _this.createTabListImage(pgaContent)
      });
    }

    // PGV Image
    pgvContent = shakemap.getContent('download/pgv.jpg');
    if (pgvContent) {
      _this.tablist.addTab({
        title: 'PGV (cm/s)',
        content: _this.createTabListImage(pgvContent)
      });
    }

    // TODO, Add StationList
    stationListContent = shakemap.getContent('download/stationlist.json');
    if (stationListContent) {
      var shakeMapStationListView = ShakeMapStationListView({
            el: document.createElement('div'),
            model: stationListContent
          });
      _this.tablist.addTab({
        title: 'Station List',
        content: function () {
          shakeMapStationListView.render();
          return shakeMapStationListView.el;
        }
      });
    }

    // TODO, Add ShakeMap Info View
    shakeMapInfoContent = shakemap.getContent('download/info.json');
    if (shakeMapInfoContent) {
      _this.tablist.addTab({
        title: 'Info',
        content: '<p>TODO :: Add Shakemap Info View</p>'
      });
    }

    // Uncertainty Image
    uncertaintyContent = shakemap.getContent('download/sd.jpg');
    if (uncertaintyContent) {
      _this.tablist.addTab({
        title: 'Uncertainty',
        content: _this.createTabListImage(uncertaintyContent)
      });
    }

    // PSA Images
    if (shakemap.getContent('download/psa03.jpg') ||
        shakemap.getContent('download/psa10.jpg') ||
        shakemap.getContent('download/psa30.jpg')) {
      _this.tablist.addTab({
        title: 'PSA (cm/s)',
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
  _this.createTabListImage = function (content) {
    var link;

    if (!content.get('url')) {
      return '';
    }

    // TODO :: enable shakmap layer on interactive map (add parameter to hash?)
    link = '<a href="#general_map">' +
        '<img src="' + content.get('url') + '" />' +
        '</a>';

    return link;
  };

  _this.destroy = Util.compose(function () {
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
      _this.tablist = new TabList({
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