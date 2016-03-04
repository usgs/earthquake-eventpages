'use strict';

var Events = require('util/Events'),
    Model = require('mvc/Model'),
    Module = require('core/Module'),
    Util = require('util/Util'),

    GeneralSummaryModule = require('general/GeneralSummaryModule'),
    ShakeMapModule = require('shakemap/ShakeMapModule');

var _DEFAULTS = {
  'event': null, // CatalogEvent
  'config': {
  },
  'defaultModule': GeneralSummaryModule.ID,
  'modules': [
    // General
    [GeneralSummaryModule, Module],
    // Impact
    [ShakeMapModule],
    // Scientific
    []
  ]
};

var EventPage = function (options) {
  var _this,
      _initialize,

      _config,
      _currentModule,
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
      _parseHash,
      _renderFooterContent,
      _renderHeaderContent;


  _this = Events();

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _event = options.event;
    _config = options.config;
    _config.defaultModule = options.defaultModule;
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
    _renderHeaderContent();
    _renderFooterContent();

    // render module
    Events.on('hashchange', _onHashChange);
    _onHashChange();
  };


  _createNavItem = function (module, isHeader) {
    var link,
        navItem;

    if (isHeader) {
      navItem = document.createElement('header');
      link = navItem.appendChild(document.createElement('a'));
    } else {
      navItem = document.createElement('a');
      link = navItem;
    }

    link.setAttribute('class', 'module-' + module.ID + '-nav');
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
        module = modules[j];

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
      return module.hasContent(_model);
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
   * Update model and module based on current url.
   *
   * If current url is unexpected/unknown, loads default module.
   * Triggers a render of current module.
   */
  _onHashChange = function () {
    var currentNav,
        hash,
        lastNav,
        modelParams,
        module,
        params;

    // parse urls of format "#module?params" where params is in query string format
    hash = _parseHash(window.location.hash || '');
    module = hash.module;
    params = hash.params;

    // verify module is known, otherwise load default (from "config")
    if (!_modules.hasOwnProperty(module)) {
      // TODO: rewrite module name instead of always using default
      module = _config.defaultModule;

      // this will trigger a hashchange event...
      window.location.hash = '#' + module;
      return;
    }

    // if current module is different than requested, destroy current module
    if (_currentModule && _currentModule.ID !== module) {
      _currentModule.destroy();
      _currentModule = null;
    }

    // if no current module, create module with model and module content element
    if (!_currentModule) {
      _currentModule = _modules[module]({
        el: _eventContentEl,
        model: _model
      });
    }

    // update module params
    params = Util.extend({}, _model.get(module), params);
    modelParams = {};
    modelParams[module] = params;
    // this triggers a render of _currentModule
    _model.set(modelParams);

    // update navigation
    currentNav = _navEl.querySelector('.module-' + _currentModule.ID + '-nav');
    lastNav = _navEl.querySelector('.current-module');
    if (currentNav !== lastNav) {
      if (lastNav) {
        lastNav.classList.remove('current-module');
      }
      currentNav.classList.add('current-module');
    }

    // notify that page was rendered
    _this.trigger('render');

    // TODO: remove this
    _eventHeaderEl.querySelector('.module-settings').innerHTML =
        '<pre>' +
          JSON.stringify({
            'module': module,
            'params': params
          }, null, 2) +
        '</pre>';
  };

  /**
   * Parse the module and module parameters from a hash fragment.
   *
   * @param hash {String}
   *        the hash fragment to parse.
   *        e.g. "#module?param1=value1&param2=value2"
   * @return {Object}
   *         module {String} name of module.
   *         params {Object} module parameters.
   */
  _parseHash = function (hash) {
    var module,
        params,
        parts;

    hash = hash.replace('#', '');
    parts = hash.split('?');
    module = parts[0];
    params = {};
    if (parts.length > 1) {
      // rejoin any remaining parts using ?, then split parameters on &
      parts = parts.slice(1).join('?').split('&');
      // parse each parameter
      parts.forEach(function (param) {
        var name,
            parts,
            value;
        // parameter and value are separated by =
        parts = param.split('=');
        name = parts[0];
        // value may include =, so slice and rejoin
        value = parts.slice(1).join('=');
        params[name] = value;
      });
    }
    return {
      'module': module,
      'params': params
    };
  };

  _renderFooterContent = function () {
    // TODO :: Contributor and additional information links. Maybe scenario
    //         link goes here as well.
    _eventFooterEl.innerHTML = '<h2>Event Page Footer</h2>';
  };

  _renderHeaderContent = function () {
    // TODO :: Impact summary bubbles and other header info, maybe scenario
    //         alert goes here as well.
    _eventHeaderEl.innerHTML = '<h2>Event Page Header</h2>' +
        '<div class="module-settings"></div>';
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = EventPage;
