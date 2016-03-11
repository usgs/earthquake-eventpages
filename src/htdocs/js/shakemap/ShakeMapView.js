'use strict';

var ProductView = require('core/ProductView'),
    ShakeMapStationListView = require('shakemap/ShakeMapStationListView'),
    TabList = require('tablist/TabList');


var ShakeMapView = function (options) {
  var _this,
      _initialize;

  _this = ProductView(options);

  _initialize = function () {
    _this.el.classList.add('shakemap');
  };

  _this.render = function () {
    var el,
        shakemap;

    el = _this.el;
    shakemap = _this.model;

    if (shakemap.get('status').toUpperCase() === 'DELETE') {
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
      markup.push('<h3>PSA 0.3s (%g)</h3>');
      markup.push(_this.createTabListImage(psa03));
    }

    if (psa10) {
      markup.push('<h3>PSA 1.0s (%g)</h3>');
      markup.push(_this.createTabListImage(psa10));
    }

    if (psa30) {
      markup.push('<h3>PSA 3.0s (%g)</h3>');
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

    // Intesity Image
    if (shakemap.getContent('download/intensity.jpg')) {
      _this.tablist.addTab({
        title: 'Intensity',
        content: _this.createTabListImage(
            shakemap.getContent('download/intensity.jpg')
        )
      });
    }

    // PGA Image
    if (shakemap.getContent('download/pga.jpg')) {
      _this.tablist.addTab({
        title: 'PGA (%g)',
        content: _this.createTabListImage(
            shakemap.getContent('download/pga.jpg')
        )
      });
    }

    // PGV Image
    if (shakemap.getContent('download/pgv.jpg')) {
      _this.tablist.addTab({
        title: 'PGV (cm/s)',
        content: _this.createTabListImage(
            shakemap.getContent('download/pgv.jpg')
        )
      });
    }

    // TODO, Add StationList
    if (shakemap.getContent('download/stationlist.json')) {
      var shakeMapStationListView = ShakeMapStationListView({
            el: document.createElement('div'),
            model: shakemap.getContent('download/stationlist.json')
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
    if (shakemap.getContent('download/info.json')) {
      _this.tablist.addTab({
        title: 'Info',
        content: '<p>TODO :: Add Shakemap Info View</p>'
      });
    }

    // Uncertainty Image
    if (shakemap.getContent('download/sd.jpg')) {
      _this.tablist.addTab({
        title: 'Uncertainty',
        content: _this.createTabListImage(
            shakemap.getContent('download/sd.jpg')
        )
      });
    }

    // PSA Images
    if (shakemap.getContent('download/pgv.jpg')) {
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

  _initialize();
  options = null;
  return _this;
};

module.exports = ShakeMapView;