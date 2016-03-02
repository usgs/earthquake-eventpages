'use strict';

var Events = require('util/Events'),
    Model = require('mvc/Model'),
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
      _el,
      _event,
      _model,
      _modules,
      _navEl,

      _createNavItem,
      _initializeModules,
      _moduleHasContent,
      _onHashChange;


  _this = Events();

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _event = options.event;
    _config = options.config;

    _el = options.el || document.createElement('div');
    _navEl = options.nav || document.createElement('nav');

    _model = Model({
      'event': _event,
      'config': _config
    });

    // Creates the mapping for later
    _initializeModules();

    Events.on('hashchange', _onHashChange);
  };


  _createNavItem = function (module) {
    var navItem;

    navItem = document.createElement('a');
    navItem.setAttribute('href', '#' + module.ID);
    navItem.innerHTML = module.TITLE;

    return navItem;
  };

  /**
   * Builds an navigation for current _event as well as a map of
   * moduleId => module.
   *
   */
  _initializeModules = function () {
    var group,
        i,
        j,
        module,
        modules,
        moduleGroups,
        numGroups,
        numModules,
        types;

    _modules = {};

    types = Object.keys(_event.getProducts());
    moduleGroups = _config.modules;

    for (i = 0; i < numGroups; i++) {
      modules = moduleGroups[i];
      group = null;

      numModules = modules.length;
      for (j = 0; j < numModules; j++) {
        module = modules[i];

        _modules[module.ID] = module;

        if (_moduleHasContent(module, types)) {
          if (!group) {
            group = document.createElement('section');
          }

          group.appendChild(_createNavItem(module));
        }
      }
      if (group) {
        _navEl.appendChild(group);
      }

      group = null;
    }

    // TODO :: Add one-off links to navigation ...
  };

  _moduleHasContent = function (module, productTypes) {
    var i,
        len,
        type;

    if (module.hasOwnProperty('hasContent') &&
        typeof module.hasContent === 'function') {
      return module.hasContent(_event);
    } else if (module.hasOwnProperty('TYPES') && Array.isArray(module.TYPES)) {
      len = module.TYPES.length;
      for (i = 0; i < len; i++) {
        type = module.TYPES[i];

        if (productTypes.indexOf(type) !== -1) {
          return true;
        }
      }
    }

    return false;
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
