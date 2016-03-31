'use strict';


var Attribution = require('core/Attribution'),
    DYFIFormModule = require('dyfi/DYFIFormModule'),
    DYFIModule = require('dyfi/DYFIModule'),
    Events = require('util/Events'),
    FiniteFaultModule = require('finite-fault/FiniteFaultModule'),
    FocalMechanismModule = require('focal-mechanism/FocalMechanismModule'),
    Formatter = require('core/Formatter'),
    GeneralSummaryModule = require('general/GeneralSummaryModule'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    InteractiveMapModule = require('map/InteractiveMapModule'),
    Model = require('mvc/Model'),
    MomentTensorModule = require('moment-tensor/MomentTensorModule'),
    OriginModule = require('origin/OriginModule'),
    PAGERModule = require('losspager/PAGERModule'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule'),
    ShakeMapModule = require('shakemap/ShakeMapModule'),
    Util = require('util/Util'),
    WaveformModule = require('waveform/WaveformModule');


var _DEFAULTS = {
  'event': null, // CatalogEvent
  'config': {
  },
  'defaultModule': GeneralSummaryModule.ID,
  'modules': [
    // General
    [GeneralSummaryModule, InteractiveMapModule],
    // Impact
    [
      ImpactSummaryModule,
      DYFIFormModule,
      DYFIModule,
      ShakeMapModule,
      PAGERModule
    ],
    // Scientific
    [
      ScientificSummaryModule,
      OriginModule,
      MomentTensorModule,
      FocalMechanismModule,
      FiniteFaultModule,
      WaveformModule
    ]
  ],
  'redirects': {
    // General
    'general_summary': GeneralSummaryModule.ID,
    'general_map': InteractiveMapModule.ID,
    // Impact
    'impact_summary': ImpactSummaryModule.ID,
    'impact_tellus': DYFIFormModule.ID,
    'impact_dyfi': DYFIModule.ID,
    'impact_shakemap': ShakeMapModule.ID,
    'impact_pager': PAGERModule.ID,
    // Scientific
    'scientific_summary': ScientificSummaryModule.ID,
    'scientific_origin': OriginModule.ID,
    'scientific_moment-tensor': MomentTensorModule.ID,
    'scientific_focal-mechanism': FocalMechanismModule.ID,
    'scientific_finite-fault': FiniteFaultModule.ID,
    'scientific_waveforms': WaveformModule.ID
  }
};

var EventPage = function (options) {
  var _this,
      _initialize,

      _config,
      _currentModule,
      _el,
      _event,
      _formatter,
      _hasPrevious,
      _model,
      _modules,
      _navEl,
      _redirects,

      _createNavItem,
      _initializeModules,
      _onHashChange,
      _parseHash,
      _parseLegacyHash;


  _this = Events();

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
    _redirects = options.redirects;

    _event = options.event;
    _config = options.config;
    _config.defaultModule = options.defaultModule;
    _config.modules = options.modules;

    _formatter = options.formatter || Formatter();
    // whether event page has previously rendered any content
    _hasPrevious = false;

    _this.updateContributors();
    if (_config.hasOwnProperty('ATTRIBUTION_URL')) {
      Attribution.load(_config.ATTRIBUTION_URL);
    }

    _el = options.el || document.createElement('div');
    _navEl = options.nav || document.createElement('nav');

    _this.header = _el.querySelector('.event-header') ||
        document.createElement('div');
    _this.content = _el.querySelector('.event-content') ||
        document.createElement('div');
    _this.footer = _el.querySelector('.event-footer') ||
        document.createElement('div');

    _model = Model({
      'event': _event,
      'config': _config
    });

    // Creates the mapping for later
    _initializeModules();
    _this.renderHeader();
    Attribution.whenReady(_this.renderFooter); // Need to wait ...

    // render module
    Events.on('back', 'onBack', _this);
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

    types = (_event ? Object.keys(_event.getProducts()) : []);
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

        if (_this.moduleHasContent(module, types)) {
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

    _this.createLinks(_navEl);
  };

  /**
   * Adds Links to the bottom of the navigation.
   * @params el {DOMElement}
   *    The element to add the links to.
   */
  _this.createLinks = function(el) {
    var link,
        kmlURL;

    if (_event && _config.KML_STUB) {
      kmlURL = _config.KML_STUB.replace('%s',
          _event.getEventId());

      link = document.createElement('a');
      link.setAttribute('class', 'kml-download');
      link.setAttribute('href', kmlURL);
      link.innerHTML = 'Download Event KML';
      el.appendChild(link);
    }

    if (!_this.isScenarioMode()) {
      link = document.createElement('a');
      link.setAttribute('class', 'latest-earthquakes');
      link.setAttribute('href', '/earthquakes/map/');
      link.innerHTML = 'Latest Earthquakes';
      el.appendChild(link);
    }
  };

  /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (!_this) {
      return;
    }

    // render module
    Events.off('back', 'onBack', _this);
    Events.off('hashchange', _onHashChange);

    if (_currentModule) {
      _currentModule.destroy();
    }

    if (_model) {
      _model.destroy();
    }

    // functions
    _createNavItem = null;
    _initializeModules = null;
    _onHashChange = null;
    _parseHash = null;
    _parseLegacyHash = null;

    // variables
    _config = null;
    _currentModule = null;
    _el = null;
    _event = null;
    _formatter = null;
    _hasPrevious = false;
    _model = null;
    _modules = null;
    _navEl = null;
    _this = null;
  }, _this.destroy);


  /**
   * Loops over each product and checks for source information. Creates a
   * unique list of contributors and then sets this list on the
   * Attribution so we have a complete list.
   *
   */
  _this.updateContributors = function () {
    var allProducts,
        products,
        product,
        source,
        sources,
        type,
        i,
        length;

    allProducts = _event ? _event.getProducts() : {};
    sources = {};

    for (type in allProducts) {
      products = allProducts[type];
      length = products.length;

      for (i = 0; i < length; i++) {
        product = products[i];


        // check product source
        source = product.get('source');
        if (source) {
          source = source.toLowerCase();

          if (source !== 'admin' && !sources.hasOwnProperty(source)) {
            sources[source] = true;
          }
        }

        source = product.getProperty('origin-source');
        if (source) {
          source = source.toLowerCase();
          if (!sources.hasOwnProperty(source)) {
            sources[source] = source;
          }
        }
        source = product.getProperty('magnitude-source');
        if (source) {
          source = source.toLowerCase();
          if (!sources.hasOwnProperty(source)) {
            sources[source] = source;
          }
        }
        source = product.getProperty('beachball-source');
        if (source) {
          source = source.toLowerCase();
          if (!sources.hasOwnProperty(source)) {
            sources[source] = source;
          }
        }
      }
    }

    Attribution.setContributors(Object.keys(sources));
  };

  /**
   * Check whether event page is in scenario mode.
   *
   * @return {Boolean}
   *     true, when event page is configured to be in scenario mode;
   *     false, otherwise.
   */
  _this.isScenarioMode = function () {
    return (_config.SCENARIO_MODE === true);
  };

  /**
   * Check whether a module has content.
   *
   * If `module` defines a static hasContent method, defer to module.
   * Otherwise, `module` should define a static TYPES property with a list
   * of "base" product types; if event page is in scenario mode, automatically
   * adds "-scenario" suffix to base type.
   *
   * @param module {Module}
   *     the module to check.
   * @param productTypes {Array<String>}
   *     array of product types associated with current event.
   * @return {Boolean}
   *     true, if module should be included in navigation;
   *     false, otherwise.
   */
  _this.moduleHasContent = function (module, productTypes) {
    var i,
        isScenarioMode,
        len,
        type;

    if (module.hasOwnProperty('hasContent') &&
        typeof module.hasContent === 'function') {
      return module.hasContent(_model);
    } else if (module.hasOwnProperty('TYPES') && Array.isArray(module.TYPES)) {
      len = module.TYPES.length;
      isScenarioMode = _this.isScenarioMode();

      for (i = 0; i < len; i++) {
        type = module.TYPES[i];
        if (isScenarioMode) {
          type += '-scenario';
        }

        if (productTypes.indexOf(type) !== -1) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Back event listener.
   *
   * Called in response to `back` event on global Events object.
   */
  _this.onBack = function () {
    if (_hasPrevious) {
      // there is a previous module to render
      window.history.back();
    } else {
      window.location.hash = '#' + _config.defaultModule;
    }
  };

  /**
   * Update model and module based on current url.
   *
   * If current url is unexpected/unknown, loads default module.
   * Triggers a render of current module.
   */
  _onHashChange = function () {
    var clearSettings,
        currentNav,
        hash,
        lastNav,
        modelParams,
        module,
        params,
        redirect;

    // parse urls of format "#module?params" where params is in query string format
    hash = _parseHash(window.location.hash || '');
    module = hash.module;
    params = hash.params;

    // verify module is known, otherwise load default (from "config")
    if (!_modules.hasOwnProperty(module)) {
      hash = _parseLegacyHash(window.location.hash || '');
      module = hash.module;
      params = hash.params;

      if (_modules.hasOwnProperty(module)) {
        redirect = '#' + hash.redirect;
      } else {
        redirect = '#' + _config.defaultModule;
      }

      try {
        // Replace the "bad" url so users can go back before the redirect
        window.location.replace(redirect);
      } catch (e) {
        window.location = redirect;
      }

      return;
    }

    if (_currentModule) {
      // can navigate backwards using window.history
      _hasPrevious = true;

      // if current module is different than requested, destroy current module
      if (_currentModule.ID !== module) {
        // Clear these so defaults are invoked
        clearSettings = {};
        clearSettings[_currentModule.ID] = {};
        _model.set(clearSettings, {silent: true});

        _currentModule.destroy();
        _currentModule = null;
      }
    }

    // if no current module, create module with model and module content element
    if (!_currentModule) {
      _currentModule = _modules[module]({
        el: _this.content,
        formatter: _formatter,
        model: _model
      });
    }

    // update module params
    params = Util.extend({}, params);
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
        name = decodeURIComponent(parts[0]);
        // value may include =, so slice and rejoin
        value = decodeURIComponent(parts.slice(1).join('='));
        params[name] = value;
      });
    }
    return {
      'module': module,
      'params': params
    };
  };

  /**
   * Parse the module and module parameters from a hash fragment.
   *
   * @param hash {String}
   *        the hash fragment to parse.
   * @return {Object}
   *         module {String} name of module.
   *         params {Object} module parameters.
   *         redirect {Object} redirect parameters.
   */
  _parseLegacyHash = function (hash) {
    var module,
        params,
        parts,
        redirect;

    hash = hash.replace('#', '');
    params = {};
    parts = hash.split(':');
    module = parts[0];

    if (_redirects.hasOwnProperty(module)) {
      module = _redirects[module];
    }

    redirect = module;

    if (parts.length > 1) {
      parts = parts.slice(1).join(':').split('_');

      if (parts[0]) {
        params.source = parts[0];
        redirect += '?source=' + parts[0];
      }

      if (parts[1]) {
        params.code = parts[1];
        redirect += '&code=' + parts[1];
      }
    }

    return {
      'module': module,
      'params': params,
      'redirect': redirect
    };
  };

  _this.renderFooter = function () {
    var markup;

    markup = [
      '<h3>Contributors</h3>',
      Attribution.getContributorList(),
      '<h3>Additional Information</h3>',
      '<ul>'
    ];

    if (_this.isScenarioMode()) {
      markup.push('<li><a href="/scenarios/">Scenario Home Page</a></li>');
    } else {
      markup.push(
        '<li>',
          '<a href="/data/comcat/">',
            'About ANSS Comprehensive Catalog (ComCat)',
          '</a>',
        '</li>');
    }

    markup.push(
      '<li>',
        '<a href="terms.php">Technical terms used on event pages</a>',
      '</li>',
      '</ul>');

    _this.footer.innerHTML = markup.join('');
  };

  _this.renderHeader = function () {
    var alertlevel,
        buf,
        cdi,
        impactBuf,
        mmi,
        props,
        summary,
        tsunami;

    buf = [];
    if (_event) {
      summary = _event.getSummary();
      props = summary.properties;

      alertlevel = props.alert;
      cdi = props.cdi;
      mmi = props.mmi;
      tsunami = props.tsunami;
      impactBuf = [];

      if (cdi !== null) {
        cdi = _formatter.mmi(cdi);
        impactBuf.push('<a href="#dyfi"' +
            ' class="mmi' + cdi + '"' +
            ' title="Did You Feel It? maximum reported intensity"' +
            '>' +
              '<strong class="roman">' + cdi + '</strong>' +
              '<br/>' +
              '<abbr title="Did You Feel It?">DYFI?</abbr>' +
            '</a>');
      }

      if (mmi !== null) {
        mmi = _formatter.mmi(mmi);
        impactBuf.push('<a href="#shakemap"' +
            ' class="mmi' + mmi + '"' +
            ' title="ShakeMap maximum estimated intensity"' +
            '>' +
              '<strong class="roman">' + mmi + '</strong>' +
              '<br/>' +
              '<abbr title="ShakeMap">ShakeMap</abbr>' +
            '</a>');
      }
      if (alertlevel !== null) {
        impactBuf.push('<a href="#pager"' +
            ' class="pager-alertlevel-' + alertlevel.toLowerCase() + '"' +
            ' title="PAGER estimated impact alert level"' +
            '>' +
              '<strong class="roman">' +
                alertlevel.toUpperCase() +
              '</strong>' +
              '<br/>' +
              '<abbr title="' +
                  'Prompt Assessment of Global Earthquakes for Response' +
                  '">PAGER</abbr>' +
            '</a>');
      }
      if (tsunami > 0) {
        impactBuf.push('<a href="http://www.tsunami.gov/"' +
            ' class="tsunami"' +
            ' title="Tsunami Warning Center"' +
            '>' +
              '<img src="images/logos/tsunami.jpg"' +
                  ' alt="Tsunami Warning Center"/>' +
            '</a>');
      }
      if (impactBuf.length > 0) {
        buf.push('<div class="impact-bubbles clearfix">' +
            impactBuf.join('') +
            '</div>');
      }
    }

    if (_this.isScenarioMode()) {
      buf.push(
        '<div class="alert warning">' +
          'This event is a scenario (it did not occur) and should only be ' +
          'used for planning purposes.' +
          '<br/>' +
          '<a href="/scenarios/">More information about scenarios</a>' +
        '</div>'
      );
    }

    _this.header.innerHTML = buf.join('');
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = EventPage;
