'use strict';

var ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList');


var ShakeMapView = function (options) {
  var _this;

  _this = ProductView(options);

  _this.render = function () {
    var el,
        shakemap;

    el = _this.el;
    el.classList.add('shakemap');
    shakemap = _this.model.get();

    if (shakemap.status.toUpperCase() === 'DELETE') {
      el.innerHTML = '<p class="alert info">Product Deleted</p>';
    } else {
      // Build TabList with all of the shakemap images
      _this.tablist = new TabList({
        el: el,
        tabPosition: 'top',
        tabs: []
      });
      _this.createTabListData(shakemap.contents);
    }
  };

  /**
   * Generate tab contents for tablist
   *
   * @param  {object} contents,
   *         shakemap downloadable contents.
   */
  _this.createTabListData = function (contents) {

    if (contents === null) {
      return;
    }

    // Intesity Image
    if (contents.get('download/intensity.jpg')) {
      _this.tablist.addTab({
        title: 'Intensity',
        content: _this.createTabListImage(
            contents.get('download/intensity.jpg').get('url')
        )
      });
    }

    // PGA Image
    if (contents.get('download/pga.jpg')) {
      _this.tablist.addTab({
        title: 'PGA (%g)',
        content: _this.createTabListImage(
            contents.get('download/pga.jpg').get('url')
        )
      });
    }

    // PGV Image
    if (contents.get('download/pgv.jpg')) {
      _this.tablist.addTab({
        title: 'PGV (cm/s)',
        content: _this.createTabListImage(
            contents.get('download/pgv.jpg').get('url')
        )
      });
    }

    // TODO, Add StationList
    if (contents.get('download/stationlist.xml')) {
      _this.tablist.addTab({
        title: 'Station List',
        content: '<p>TODO :: Add Station List View</p>'
      });
    }

    // TODO, Add ShakeMap Info View
    if (contents.get('download/info.json')) {
      _this.tablist.addTab({
        title: 'ShakeMap Info View',
        content: '<p>TODO :: Add Shakemap Info View</p>'
      });
    }

    // Uncertainty Image
    if (contents.get('download/sd.jpg')) {
      _this.tablist.addTab({
        title: 'Uncertainty',
        content: _this.createTabListImage(
            contents.get('download/sd.jpg').get('url')
        )
      });
    }

    // PSA Images
    if (contents.get('download/pgv.jpg')) {
      _this.tablist.addTab({
        title: 'PSA (cm/s)',
        content: _this.createPSATabListImages([
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
        ])
      });
    }
  };

  /**
   * Create tab content for all PSA images (PSA 0.3, 1.0, 3.0)
   *
   * @param  {array} contents
   *    array of objects with title and url for images to display
   *
   * @return {string} markup
   *    HTML markup for PSA tab contents
  **/
  _this.createPSATabListImages = function (contents) {
    var content,
        markup;

    markup = [];

    for (var i = 0; i < contents.length; i++) {
      content = contents[i];
      markup.push('<h3>' + content.title + '</h3>' +
        _this.createTabListImage(content.url)
      );
    }

    return markup.join('');
  };


  /**
   * Create combined link/image for tablist image.
   *
   * @param  {string} url
   *         url to the image
   *
   * @return {string} link
   *         image link to interactive map.
  **/
  _this.createTabListImage = function (url) {
    var link;

    // TODO :: enable shakmap layer on interactive map (add parameter to hash?)
    link = '<a href="#general_map"><img src="' + url + '" /></a>';

    return link;
  };

  options = null;
  return _this;
};

module.exports = ShakeMapView;