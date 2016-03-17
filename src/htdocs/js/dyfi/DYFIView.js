'use strict';


var DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView'),
    DYFIResponsesView = require('dyfi/DYFIResponsesView'),
    ProductView = require('core/ProductView'),
    SvgImageMap = require('svgimagemap/SvgImageMap'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS = {

};

var _RESOURCES = {
  'intensity-map': {
    title: 'Intensity Map',
    suffix: '_ciim.jpg',
    usemap: 'imap_base',
    href: '#map?', // TODO :: ShakeMap = false & DYFI = true
    mapSuffix: '_ciim_imap.html'
  },
  'geocode-map': {
    title:'Geocoded Map',
    suffix:'_ciim_geo.jpg',
    usemap:'imap_geo',
    mapSuffix:'_ciim_geo_imap.html'
  },
  'zoom-map': {
    title:'Zoom Map',
    suffix:'_ciim_zoom.jpg',
    usemap:'imap_zoom',
    mapSuffix:'_ciim_zoom_imap.html'
  },
  'zoom-out-map': {
    title:'Zoom Out Map',
    suffix:'_ciim_zoomout.jpg',
    usemap:'imap_zoomout',
    mapSuffix:'_ciim_zoomout_imap.html'
  },
  'intensity-distance': {
    title:'Intensity Vs. Distance',
    suffix:'_plot_atten.jpg',
    subview: DYFIIntensityGraphView,
    subviewContent: 'dyfi_plot_atten.json'
  },
  'response-time': {
    title:'Responses Vs. Time',
    suffix:'_plot_numresp.jpg'
  },
  'response-list': {
    title: 'DYFI Responses',
    subview: DYFIResponsesView,
    subviewContent: 'cdi_zip.xml'
  }
};


var DYFIView = function (options) {
  var _this,
      _initialize,

      _resources,
      _tabList,
      _tabs;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  /**
   * Initializes a new view.
   *
   */
  _initialize = function (/*options*/) {
    _this.el.classList.add('dyfi-view');

    _resources = Util.extend({}, _RESOURCES, options.resources);
  };


  _this.createImageTab = function (params) {
    var container,
        image,
        map,
        tab;

    tab = {
      title: params.title
    };

    if (params.href) {
      container = document.createElement('a');
      container.setAttribute('href', params.href);
    } else {
      container = document.createElement('div');
    }

    if (!params.map) {
      image = container.appendChild(document.createElement('img'));
      image.setAttribute('alt', params.alt);
      // Defer setting image src so image is not fetched until tab is loaded
    }

    return {
      title: params.alt,
      content: function () {
        if (params.map) {
          map = SvgImageMap({
            el: container,
            imageAlt: params.alt,
            imageUrl: params.image,
            mapUrl: params.map,
            mapName: params.mapName
          });
        }

        return container;
      },
      onDestroy: function () {
        if (map && map.destroy) {
          map.destroy();
        }
      },
      onSelect: function () {
        if (map && map.render) {
          map.render();
        } else if (image) {
          image.setAttribute('src', params.image);
        }
      }
    };
  };

  _this.createSubViewTab = function (params) {
    var subview;

    subview = params.constructor({
      model: params.content
    });

    return {
      title: params.title,
      content: subview.el,
      onDestroy: function () {
        subview.destroy();
      },
      onSelect: function () {
        subview.render();
      }
    };
  };

  _this.createTab = function (params) {
    var code,
        imageContent,
        imageMapContent,
        subviewContent,
        tab;

    code = _this.model.get('code');

    imageContent = _this.model.getContent(code + params.suffix);
    imageMapContent = _this.model.getContent(code + params.mapSuffix);
    subviewContent = _this.model.getContent(params.subviewContent);

    if (params.subview && subviewContent) {
      tab = _this.createSubViewTab({
        constructor: params.subview,
        content: subviewContent,
        title: params.title
      });
    } else if (imageContent) {
      tab = _this.createImageTab({
        alt: params.title,
        href: params.href,
        image: imageContent.get('url'),
        map: imageMapContent ? imageMapContent.get('url') : null,
        mapName: params.usemap
      });
    }

    return tab;
  };

  _this.destroy = Util.compose(function () {
    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
    }


    _resources = null;
    _tabList = null;
    _tabs = null;


    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.render = function () {
    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
    }

    _tabList = TabList({
      el: _this.el,
      tabs: []
    });

    // The `addTab` method returns an object with a select method such
    // that this view can subsequently select any particular tab as desired.
    _tabs = {};
    Object.keys(_resources).forEach(function (key) {
      var info,
          tab;

      info = _resources[key];
      tab = _this.createTab(info);
      if (tab) {
        _tabs[key] = _tabList.addTab(tab);
      }
    });
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DYFIView;
