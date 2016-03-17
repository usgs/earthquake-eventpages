'use strict';


var ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var DYFIView = function (options) {
  var _this,
      _initialize,

      _intensityMapTab,
      _intensityPlotTab,
      _responsesPlotTab,
      _responsesTableTab,
      _tabList;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  /**
   * Initializes a new view.
   *
   */
  _initialize = function (/*options*/) {
    _this.el.classList.add('dyfi-view');

    _tabList = TabList({
      el: _this.el,
      tabs: []
    });

    // The `addTab` method returns an object with a select method such
    // that this view can subsequently select any particular tab as desired.
    _intensityMapTab = _tabList.addTab(_this.createIntensityMapTab());
    _intensityPlotTab = _tabList.addTab(_this.createIntensityPlotTab());
    _responsesPlotTab = _tabList.addTab(_this.createResponsesPlotTab());
    _responsesTableTab = _tabList.addTab(_this.createResponsesTableTab());
  };


  _this.createIntensityMapTab = function () {
    var tab;

    tab = {
      title: 'Intensity Map',
      content: '<p>Intensity Map Tab Content</p>' // TODO
    };

    return tab;
  };

  _this.createIntensityPlotTab = function () {
    var tab;

    tab = {
      title: 'Intensity Vs. Distance',
      content: '<p>Intensity Vs. Distance Tab Content</p>' // TODO
    };

    return tab;
  };

  _this.createResponsesPlotTab = function () {
    var tab;

    tab = {
      title: 'Responses Vs. Time',
      content: '<p>Responses Vs. Time Tab Content</p>' // TODO
    };

    return tab;
  };

  _this.createResponsesTableTab = function () {
    var tab;

    tab = {
      title: 'DYFI Responses',
      content: '<p>DYFI Responses Tab Content</p>' // TODO
    };

    return tab;
  };

  _this.destroy = Util.compose(function () {
    _tabList.destroy();


    _intensityMapTab = null;
    _intensityPlotTab = null;
    _responsesPlotTab = null;
    _responsesTableTab = null;
    _tabList = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DYFIView;
