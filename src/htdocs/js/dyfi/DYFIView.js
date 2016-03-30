'use strict';


var DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView'),
    DYFIResponsesView = require('dyfi/DYFIResponsesView'),
    InteractiveMapView = require('map/InteractiveMapView'),
    ProductView = require('core/ProductView'),
    SvgImageMap = require('svgimagemap/SvgImageMap'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS = {

};

// Map of information used to generate tabs
var _RESOURCES = {
  'intensity-map': {
    title: 'Intensity Map',
    suffix: '_ciim.jpg',
    usemap: 'imap_base',
    href: '#map?' +
        InteractiveMapView.SHAKEMAP_CONTOURS + '= false&' +
        InteractiveMapView.DYFI_10K_OVERLAY + '=true&' +
        InteractiveMapView.DYFI_DEFAULT_OVERLAY + '=true',
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


/**
 * This class extends a ProductView and is used to render a DYFI product.
 *
 * @param options {Object}
 *     Configuration options. See _initialize for more details.
 */
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
   * @param options {Object}
   *     Configuration options. Nothing specific to this view at this time.
   */
  _initialize = function (/*options*/) {
    _this.el.classList.add('dyfi-view');

    _resources = Util.extend({}, _RESOURCES, options.resources);
  };


  /**
   * Creates an image-based tab. Image-based tabs consist of an image tag,
   * optionally wrapped in a link, optionally with a corresponding image map
   * for interations.
   *
   * @param params {Object}
   *     Information used to generate the image-based tab.
   * @param params.alt {String}
   *     The title for this tab. Also used as alt text for the image.
   * @param params.href {String} Optional.
   *     The URL to use for a link wrapping the image. If not specified,
   *     no link will wrap the image.
   * @param params.image {String}
   *     The URL to use for the image source.
   * @param params.map {String} Optional.
   *     The URL to use for the image map. If not specified, no corresponding
   *     image map will be generated.
   * @param params.usemap {String} Optional.
   *     The name/id to use for simple image maps. SvgImageMap (the typical
   *     behavior) will not use this parameter.
   *
   * @return {Object}
   *     A tab object as expected in order to provide to the TabList#addTab
   *     method.
   *
   * @see TabList#addTab
   */
  _this.createImageTab = function (params) {
    var container,
        image,
        map;

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
      // Called when tab list is destroyed. Cleans up map if one was generated.
      onDestroy: function () {
        if (map && map.destroy) {
          map.destroy();
        }
      },
      // Called when tab is selected. Give map chance to render if one was
      // generated, otherwise just set image.src to fetch the content.
      onSelect: function () {
        if (map && map.render) {
          map.render();
        } else if (image) {
          image.setAttribute('src', params.image);
        }
      }
    };
  };

  /**
   * Creates a subview-based tab. Subview-based tabs delegate rendering
   * to a different view. The subview itself is created immediately, rendered
   * during tab.onSelect, and destroyed during tabList.onDestroy.
   *
   * @param params {Object}
   *     Configuration parameters for creating the subview-base tab.
   * @param params.constructor {Function}
   *     A constructor factory that returns a view instance.
   * @param params.content {Model}
   *     The model to provide the created view. Typically a {Content} model.
   * @param params.title {String}
   *     The title to put on the tab.
   *
   * @return {Object}
   *     A tab object as expected in order to provide to the TabList#addTab
   *     method.
   *
   * @see TabList#addTab
   */
  _this.createSubViewTab = function (params) {
    var subview;

    subview = params.constructor({
      model: params.content,
      product: _this.model
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

  /**
   * Creates a tab based on information found in the given params. Based on the
   * available information and corresponding content on `_this.model`, this
   * method will either (1) produce a subview-based tab, (2) produce an
   * image-based tab, or (3) not produce a tab.
   *
   * @param params {Object}
   *     Configuration parameters for creating the tab.
   *
   * @return {Object}
   *     A tab object as expected in order to provide to the TabList#addTab
   *     method.
   *
   * @see TabList#addTab
   * @see DYFIView#createImageTab
   * @see DYFIView#createSubViewTab
   */
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

  /**
   * Destroys sub-views (TabList) and frees all references. Calls parent
   * destroy method via composition.
   *
   */
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

  /**
   * Creates the `_tabList` and loads tab contents based on what is available
   * in `_this.model`. If an `_tabList` was previously created, it is destroyed
   * before a new `_tabList` is created. This is required since {TabList} does
   * not yet have a "removeTab" method.
   *
   */
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
