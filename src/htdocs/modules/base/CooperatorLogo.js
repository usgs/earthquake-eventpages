'use strict';

var Util = require('util/Util');


var _DEFAULTS = {
  cooperator: null,
  el: null
};


/**
 * Class to manage cooperator logo.
 *
 * @param options {Object}
 * @param options.cooperator {Object}
 *        optional, default null.
 *        see #setCooperator(cooperator)
 * @param options.el {Element}
 *        optional, default document.querySelector('.cooperators').
 *        if no element found, creates and attempts to add to "site-header".
 */
var CooperatorLogo = function (options) {
  var _this,
      _initialize;


  _this = {};

  _initialize = function (options) {
    var el;

    options = Util.extend({}, _DEFAULTS, options);

    // use configured element, or fall back to template element.
    el = options.el || document.querySelector('.cooperators');
    if (!el) {
      // if template element doesn't exist, create and add to site-header
      el = document.createElement('div');
      el.classList.add('cooperators');
      try {
        document.querySelector('.site-header').appendChild(el);
      } catch (e) {
        // ignore, maybe not in template
      }
    }
    _this.el = el;

    _this.setCooperator(options.cooperator);
  };

  /**
   * Clear existing cooperator list, and replace with specified  cooperator.
   *
   * @param cooperator {Object}
   *        when null, clears cooperator list and returns.
   * @param cooperator.logo {String}
   *        url for cooperator logo.
   * @param cooperator.title {String}
   *        title for cooperator.
   * @param cooperator.url {String}
   *        Optional, when omitted logo will not be linked.
   *        url for link to cooperator.
   */
  _this.setCooperator = function (cooperator) {
    var el,
        img,
        logo,
        title,
        url;

    // remove existing contributor
    Util.empty(_this.el);

    // validate new contributor
    if (!cooperator || !cooperator.logo || !cooperator.title) {
      return;
    }

    logo = cooperator.logo;
    title = cooperator.title;
    url = cooperator.url;

    // create logo
    img = document.createElement('img');
    img.setAttribute('src', logo);
    img.setAttribute('alt', 'in cooperation with ' + title);
    el = img;

    // wrap in link if applicable
    if (url) {
      el = document.createElement('a');
      el.setAttribute('href', url);
      el.appendChild(img);
    }

    // add cooperator class
    el.classList.add('cooperator');

    // add to cooperators section
    _this.el.appendChild(el);
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = CooperatorLogo;
