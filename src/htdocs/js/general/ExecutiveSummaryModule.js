'use strict';


var DyfiPinView = require('core/BasicPinView'), // TODO
    FiniteFaultPinView = require('core/BasicPinView'), // TODO
    FocalMechanismPinView = require('core/BasicPinView'), // TODO
    InteractiveMapPinView = require('core/BasicPinView'), // TODO
    LinkProductView = require('core/LinkProductView'),
    Module = require('core/Module'),
    MomentTensorPinView = require('core/BasicPinView'), // TODO
    OriginPinView = require('core/BasicPinView'), // TODO
    PagerPinView = require('core/BasicPinView'), // TODO
    Product = require('pdl/Product'),
    RegionInfoPinView = require('core/BasicPinView'), // TODO
    ShakeMapPinView = require('core/BasicPinView'), // TODO
    TextPinView = require('core/BasicPinView'), // TODO
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
    var config,
        product,
        textProducts;

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

    config = _this.model.get('config');

    textProducts = ev.getProducts(Product.getFullType('general-text', config));

    // Origin pin
    product = ev.getPreferredOriginProduct();
    if (product) {
      _this.pinViews.push(OriginPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Interactive Map pin
    // TODO :: Product ???
    _this.pinViews.push(InteractiveMapPinView({
      el: _this.createPinContainer(),
      model: ev.getPreferredOriginProduct() // TODO ...
    }).render());

    // Regional Info pin
    // TODO :: Product ???
    _this.pinViews.push(RegionInfoPinView({
      el: _this.createPinContainer(),
      model: ev.getPreferredOriginProduct() // TODO ...
    }).render());

    // PAGER pin
    product = ev.getPreferredProduct(Product.getFullType('losspager', config));
    if (product) {
      _this.pinViews.push(PagerPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Sprinkle in text products here and there
    _this.addTextProductPin(textProducts);

    // ShakeMap pin
    product = ev.getPreferredProduct(Product.getFullType('shakemap', config));
    if (product) {
      _this.pinViews.push(ShakeMapPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // DYFI pin
    product = ev.getPreferredProduct(Product.getFullType('dyfi', config));
    if (product) {
      _this.pinViews.push(DyfiPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Moment Tensor pin
    product = ev.getPreferredProduct(Product.getFullType('moment-tensor',
        config));
    if (product) {
      _this.pinViews.push(MomentTensorPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Sprinkle in text products here and there
    _this.addTextProductPin(textProducts);

    // Focal Mechanism pin
    // TODO :: Question - Do we include FM on this page?
    product = ev.getPreferredProduct(Product.getFullType('focal-mechanism',
        config));
    if (product) {
      _this.pinViews.push(FocalMechanismPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Finite Fault pin
    product = ev.getPreferredProduct(Product.getFullType('finite-fault',
        config));
    if (product) {
      _this.pinViews.push(FiniteFaultPinView({
        el: _this.createPinContainer(),
        model: product
      }).render());
    }

    // Add any remaining text products to the end
    while (textProducts.length) {
      _this.addTextProductPin(textProducts);
    }

  };

  _this.addTextProductPin = function (products) {
    var product;

    products = products || [];
    product = products.slice(0, 1)[0];

    if (product) {
      _this.pinViews.push(TextPinView({
        el: _this.createPinContainer('double-wide'),
        model: product
      }).render());
    }
  };

  /**
   * Creates an LI element, appends it to _this.pinList and sets appropriate
   * classes. The `executive-summary-pin` class is added by default but other
   * classes my be added by providing them in the `classes` parameter.
   *
   * @param classes {Array} Optional.
   *      An array of classes to add to the created container.
   *
   * @return {DOMElement}
   */
  _this.createPinContainer = function (classes) {
    var container;

    container = _this.pinList.appendChild(document.createElement('li'));
    container.classList.add('executive-summary-pin');

    classes = classes || [];
    classes.forEach(function (className) {
      container.classList.add(className);
    });

    return container;
  };


  _initialize(options);
  options = null;
  return _this;
};


ExecutiveSummary.ID = _ID;
ExecutiveSummary.TITLE = _TITLE;

ExecutiveSummary.hasContent = _hasContent;


module.exports = ExecutiveSummary;
