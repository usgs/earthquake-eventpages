'use strict';


var ForecastTableView = require('oaf/ForecastTableView'),
    ForecastTextView = require('oaf/ForecastTextView'),
    ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS,
    _RESOURCES;

_DEFAULTS = {
};

_RESOURCES = {
  'forecast-text': {
    title: 'Commentary',
    content: 'forecast.json',
    subview: ForecastTextView
  },
  'forecast-table': {
    title: 'Details',
    content: 'forecast.json',
    subview: ForecastTableView
  }
};


var OafView = function (options) {
  var _this,
      _initialize,

      _catalogEvent,
      _resources,
      _subviews,
      _tabList,
      _tabs;

  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _this.el.classList.add('oaf-view');

    _catalogEvent = options.catalogEvent;

    _resources = Util.extend({}, _RESOURCES, options.resources);
  };


  _this.createTab = function (params) {
    var content,
        subview,
        tab;

    content = _this.model.getContent(params.content);

    if (content && params.subview) {
      subview = params.subview({
          catalogEvent: _catalogEvent,
          model: content,
          product: _this.model
      });

      subview.on('forecast', 'setSubviewForecast', _this);
      _subviews.push(subview);

      tab = {
        title: params.title,
        content: subview.el,
        onDestroy: function () {
          try { subview.destroy(); } catch (e) { /* ignore */ }
        },
        onSelect: function () {
          subview.render();
        }
      };
    }

    return tab;
  };

  _this.destroy = Util.compose(function () {
    _this.el.classList.remove('oaf-view');

    _this.destroyTabList();

    _resources = null;
    _tabList = null;
    _tabs = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.destroyTabList = function () {
    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
    }

    _subviews = null;
    _tabList = null;
    _tabs = null;
  };

  _this.render = function () {
    _this.destroyTabList();

    _tabList = TabList({
      el: _this.el,
      tabs: []
    });

    _subviews = [];
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

  _this.setSubviewForecast = function (forecast) {
    _subviews.forEach(function (subview) {
      if (subview && typeof subview.setForecast === 'function') {
        subview.setForecast(forecast);
      }
    });
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = OafView;
