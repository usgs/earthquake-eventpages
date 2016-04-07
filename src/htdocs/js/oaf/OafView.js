'use strict';


var ForecastTableView = require('oaf/ForecastTableView'),
    ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS,
    _RESOURCES;

_DEFAULTS = {
};

_RESOURCES = {
  'forecast-table': {
    title: 'Table',
    content: 'forecast.json',
    subview: ForecastTableView
  }
};


var OafView = function (options) {
  var _this,
      _initialize,

      _resources,
      _tabList,
      _tabs;

  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (/*options*/) {
    _this.el.classList.add('oaf-view');

    _resources = Util.extend({}, _RESOURCES, options.resources);
  };


  _this.createTab = function (params) {
    var content,
        subview,
        tab;

    content = _this.model.getContent(params.content);

    if (content && params.subview) {
      subview = params.subview({
          model: content
      });

      tab = {
        title: params.title,
        content: subview.el,
        onDestroy: function () {
          subview.destroy();
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

    _tabList = null;
    _tabs = null;
  };

  _this.render = function () {
    _this.destroyTabList();

    _tabList = TabList({
      el: _this.el,
      tabs: []
    });

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


module.exports = OafView;
