'use strict';

var Events = require('util/Events'),
    Util = require('util/Util');


var _DEFAULTS = {
  'event': null, // CatalogEvent
  'config': {

  },
  'modules': [
    // General
    [],
    // Impact
    [],
    // Scientific
    []
  ]
};

var EventPage = function (options) {
  var _this,
      _initialize,

      _config,
      _event,
      _modules,
      _modulesIndex,

      _buildModulesIndex,
      _onHashChange;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _event = options.event;
    _config = options.config;
    _modules = options.modules;

    // Creates the mapping for later
    _buildModulesIndex();

    Events.on('hashchange', _onHashChange);
  };


  /**
   * Builds an index to map moduleId => module. In this way, incoming
   * hash change events can quickly determine which module should handle
   * rendering.
   *
   */
  _buildModulesIndex = function () {
    _modulesIndex = {};

    _modules.forEach(function (moduleGroup) {
      moduleGroup.forEach(function (module) {
        _modulesIndex[module.ID] = module;
      });
    });
  };

  /**
   * Parse URLs of format "#module?params" where params is in query string
   * format. Verify module is known, otherwise load default module (from
   * _config). If current module is different than requested, destroy current
   * module. Update module params on model. If no current module, create
   * new module with model and module content element.
   *
   */
  _onHashChange = function () {
    // TODO
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = EventPage;
