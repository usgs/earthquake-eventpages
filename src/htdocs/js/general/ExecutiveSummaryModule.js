'use strict';


var LinkProductView = require('core/LinkProductView'),
    Module = require('core/Module'),
    OriginPinView = require('core/BasicPinView'), // TODO
    TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _ID,
    _DEFAULTS,
    _TITLE,

    _hasContent;


_ID = 'executive';
_TITLE = 'Executive Summary';

_hasContent = function (eventPageModel) {
  var ev;

  ev = eventPageModel.get('event');
  if (ev !== null) {
    // only show this module if there is an event
    return true;
  }

  return false;
};

_DEFAULTS = {
};


var ExecutiveSummary = function (options) {
  var _this,
      _initialize,

      _generalLinkViews,
      _generalHeaderViews;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    var el;

    el = _this.el;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    el.classList.add('executive-summary');

    _this.pinList = _this.content.appendChild(document.createElement('ul'));
    _this.pinList.classList.add('executive-summary-pins');

    _this.linksEl = _this.content.appendChild(document.createElement('div'));
    _this.linksEl.classList.add('executive-summary-links');
  };


  _this.destroy = Util.compose(function () {
    if (_this.pinViews) {
      _this.pinViews.forEach(function (view) {
        view.destroy();
      });
    }

    if (_generalLinkViews) {
      _generalLinkViews.forEach(function (view) {
        view.destroy();
      });
    }

    if (_generalHeaderViews) {
      _generalHeaderViews.forEach(function (view) {
        view.destroy();
      });
    }

    _generalLinkViews = null;
    _generalHeaderViews = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Does a comparison of one Product against an array of Products to see if
   * the same "url" property already exists in the array.
   *
   * @param {boolean}
   *     return true if the link already exists in the array
   *
   */
  _this.isDuplicate = function (needle, haystack) {
    var i;

    try {
      for (i = 0; i < haystack.length; i++) {
        if (haystack[i].get('properties').url ===
            needle.get('properties').url) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  /**
   * Remove duplicate items from the array that have the same "url" property
   *
   * @param links {Array<Product>}
   *     An array of Products
   *
   */
  _this.removeDuplicateLinks = function (links) {
    var i,
        link,
        products;

    // add the first item since it cannot be a duplicate yet
    products = [];
    products.push(links[0]);

    // add all additional links that do not already exist in products array
    for (i = 1; i < links.length; i++) {
      link = links[i];
      if (!_this.isDuplicate(link, products)) {
        products.push(link);
      }
    }

    return products;
  };

  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderHeader(ev);
    _this.renderContent(ev);
    _this.renderFooter(ev);
  };

  _this.renderContent = function (ev) {
    _this.renderPins(ev);
    _this.renderLinks(ev);
  };

  /**
   * Render module footer.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderFooter = function (ev) {
    var downloads,
        product,
        phase;

    Util.empty(_this.footer);
    if (!ev) {
      return;
    }

    product = ev.getPreferredOriginProduct();
    if (product) {
      phase = ev.getProductById('phase-data', product.get('source'),
          product.get('code'));
      if (phase) {
        product = phase;
      }
    }

    if (product) {
      downloads = _this.getProductFooter({
        product: product
      });
      if (downloads) {
        _this.footer.appendChild(downloads);
      }
    }
  };

  /**
   * Render module header.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderHeader = function (ev) {
    var products;

    if (_generalHeaderViews) {
      _generalHeaderViews.forEach(function (view) {
        view.destroy();
      });
      _generalHeaderViews = null;
    }

    Util.empty(_this.header);
    if (!ev) {
      return;
    }

    products = ev.getProducts('general-header');

    if (products.length === 0) {
      return;
    }

    _generalHeaderViews = products.map(function (product) {
      var view;
      view = TextProductView({
        el: _this.header.appendChild(document.createElement('section')),
        model: product
      });
      view.render();
      return view;
    });
  };

  /**
   * Render any general-link products.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderLinks = function (ev) {
    var el,
        links;

    // remove any existing views if re-rendering
    if (_generalLinkViews) {
      _generalLinkViews.forEach(function (view) {
        view.destroy();
      });
      _generalLinkViews = null;
    }

    Util.empty(_this.linksEl);

    // nothing to render if no event or link products
    if (!ev) {
      return;
    }

    links = ev.getProducts('general-link');

    if (links.length === 0) {
      return;
    }

    links = _this.removeDuplicateLinks(links);

    _this.linksEl.innerHTML = '<h3>For More Information</h3>';
    el = _this.linksEl.appendChild(document.createElement('ul'));

    _generalLinkViews = links.map(function (product) {
      var view;

      view = LinkProductView({
        el: el.appendChild(document.createElement('li')),
        model: product
      });

      view.render();

      return view;
    });
  };

  _this.renderPins = function (ev) {
    var container;

    if (_this.pinViews) {
      _this.pinViews.forEach(function (view) {
        view.destroy();
      });
    }

    _this.pinViews = [];

    Util.empty(_this.pinList);

    if (!ev) {
      return;
    }


    // Origin pin
    container = _this.pinList.appendChild(document.createElement('li'));
    container.classList.add('executive-summary-pin');
    _this.pinViews.push(OriginPinView({
      el: container,
      model: ev.getPreferredOriginProduct()
    }).render());

    container = _this.pinList.appendChild(document.createElement('li'));
    container.classList.add('executive-summary-pin');
    _this.pinViews.push(OriginPinView({
      el: container,
      model: ev.getPreferredOriginProduct()
    }).render());

    container = _this.pinList.appendChild(document.createElement('li'));
    container.classList.add('executive-summary-pin');
    _this.pinViews.push(OriginPinView({
      el: container,
      model: ev.getPreferredOriginProduct()
    }).render());


  };


  _initialize(options);
  options = null;
  return _this;
};


ExecutiveSummary.ID = _ID;
ExecutiveSummary.TITLE = _TITLE;

ExecutiveSummary.hasContent = _hasContent;


module.exports = ExecutiveSummary;
