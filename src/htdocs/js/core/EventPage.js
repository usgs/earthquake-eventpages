'use strict';

var Events = require('util/Events'),
    Model = require('mvc/Model'),
    Module = require('core/Module'),
    Util = require('util/Util');


var _DEFAULTS = {
  'event': null, // CatalogEvent
  'config': {
  },
  'modules': [
    // General
    [Module],
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
      _eventContentEl,
      _eventFooterEl,
      _eventHeaderEl,
      _model,
      _modules,
      _navEl,

      _createNavItem,
      _initializeModules,
      _moduleHasContent,
      _onHashChange,
      _renderFooterContent,
      _renderHeaderContent,
      _renderModuleContent;


  _this = Events();

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _event = options.event;
    _config = options.config;
    _config.modules = options.modules;

    _el = options.el || document.createElement('div');
    _navEl = options.nav || document.createElement('nav');

    _eventHeaderEl = _el.querySelector('.event-header') ||
        document.createElement('div');
    _eventContentEl = _el.querySelector('.event-content') ||
        document.createElement('div');
    _eventFooterEl = _el.querySelector('.event-footer') ||
        document.createElement('div');

    _model = Model({
      'event': _event,
      'config': _config
    });

    // Creates the mapping for later
    _initializeModules();

    Events.on('hashchange', _onHashChange);

    _this.render();
  };


  _createNavItem = function (module, isHeader) {
    var link,
        navItem;

    if (isHeader) {
      navItem = document.createElement('header');
      link = navItem.appendChild(document.createElement('a'));
    } else {
      navItem = document.createElement('a');
      navItem = link;
    }

    link.setAttribute('href', '#' + module.ID);
    link.innerHTML = module.TITLE;

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
    numGroups = moduleGroups.length;

    Util.empty(_navEl);

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
            group.appendChild(_createNavItem(module, true));
          } else {
            group.appendChild(_createNavItem(module));
          }

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
   * @see _renderModuleContent
   */
  _onHashChange = function () {
    // TODO
  };

  _renderFooterContent = function () {
    // TODO :: Contributor and additional information links. Maybe scenario
    //         link goes here as well.
    _eventFooterEl.innerHTML = '<h2>Event Page Footer</h2>';
  };

  _renderHeaderContent = function () {
    // TODO :: Impact summary bubbles and other header info, maybe scenario
    //         alert goes here as well.
    _eventHeaderEl.innerHTML = '<h2>Event Page Header</h2>';
  };

  _renderModuleContent = function () {
    // TODO :: Delegate to current module for rendering ...
    _eventContentEl.innerHTML = '<h2>Event Page Content</h2>';
  };


  _this.render = function () {
    _renderHeaderContent();
    _renderModuleContent();
    _renderFooterContent();
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = EventPage;
