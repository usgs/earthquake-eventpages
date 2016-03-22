'use strict';


var Collection = require('mvc/Collection'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _CONTRIBUTOR_LINK_CLASS = 'contributor-link';
var _CONTRIBUTOR_LIST_CLASS = 'contributor-list';
var _CONTRIBUTOR_REFERENCE_CLASS = 'contributor-reference';
var _CONTRIBUTOR_DATA_ATTRIBUTE = 'data-id';

var _DEFAULTS = {};


var Attribution = function (options) {
  var _this,
      _initialize,
      // variables
      _contributors,
      _sourceMap,
      _whenReady,
      // methods
      _formatContributorLink,
      _formatContributorList,
      _formatContributorReference,
      _onError,
      _onSuccess,
      _onReady,
      _sortByName;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _contributors = [];
    _sourceMap = null;
    _whenReady = [];
  };


  /**
   * Get contributor link.
   *
   * @param id {String}
   *        contributor code.
   * @return {String} formatted link to contributor, or title if contributor
   *         does not have a url.
   */
  _formatContributorLink = function (id) {
    var contributor,
        title,
        url;

    id = id.toUpperCase();
    title = null;
    url = null;
    contributor = _this.getContributor(id);
    if (contributor) {
      title = contributor.title;
      url = contributor.url;
    }

    if (!title) {
      title = id;
    }

    if (url) {
      return '<a href="' + url + '">' + title + '</a>';
    } else {
      return title;
    }
  };

  /**
   * Format list of contributors.
   *
   * @return {String} formatted list of contributors.
   */
  _formatContributorList = function () {
    var listMarkup = [];

    for (var i = 0; i < _contributors.length; i++) {
      listMarkup.push('<li>' +
          _this.getContributorLink(_contributors[i]) +
          '</li>');
    }

    return listMarkup.join('');
  };

  /**
   * Format contributor reference.
   *
   * Uses abbreviation if contributor has title.
   * Adds superscript with position of contributor in contributors list.
   *
   * @param id {String}
   *        contributor id.
   * @return {String} formatted contributor reference.
   */
  _formatContributorReference = function (id) {
    var buf,
        contributor,
        listPosition,
        title,
        url;

    id = id.toUpperCase();
    title = null;
    url = null;
    contributor = _this.getContributor(id);
    if (contributor) {
      title = contributor.title;
      url = contributor.url;
    }
    listPosition = _contributors.indexOf(id.toLowerCase()) + 1;

    buf = [];
    if (title) {
      buf.push('<abbr title="' + title + '">');
    }
    buf.push(id);
    if (listPosition > 0) {
      // found in list
      buf.push('<sup>' + listPosition + '</sup>');
    }
    if (title) {
      buf.push('</abbr>');
    }
    return buf.join('');
  };

  /**
   * Attribution load error handler.
   */
  _onError = function () {
    _sourceMap = Collection([]);
    _onReady();
  };

  /**
   * Call any registered callbacks after data loads.
   */
  _onReady = function () {
    _whenReady.forEach(function (callback) {
      callback();
    });
    _whenReady = [];
  };

  /**
   * Attribution load success handler.
   *
   * @param data {Array<Object>}
   */
  _onSuccess = function (data) {
    _sourceMap = Collection(data);
    _this.render();
    _onReady();
  };

  /**
   * Sort function for contributors.
   *
   * @param a {String}
   *        first contributor code.
   * @param b {String}
   *        second contributor code.
   * @return -1, when a before b;
   *         0, when equal;
   *         1, when a after b.
   */
  _sortByName = function (a, b) {
    var aName,
        bName;

    aName = _this.getName(a);
    bName = _this.getName(b);

    if (aName < bName) {
      return -1;
    } else if (aName > bName) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   * Get a contributor by id.
   *
   * @return {Object}
   *         contributor object, with at least properties "id", "title", "url".
   *         title and url are null when contributor not found.
   */
  _this.getContributor = function (id) {
    var contributor;

    contributor = null;
    id = id.toLowerCase();

    if (_sourceMap !== null) {
      contributor = _sourceMap.get(id);

      // TODO: contributor aliases
    }

    return contributor;
  };

  /**
   * Get list of contributors.
   *
   * @return {Array<String>}
   *         list of contributor codes.
   */
  _this.getContributors = function () {
    return _contributors;
  };

  /**
   * Return formatted html list of contributors
   * (as set by #setContributors(Array)).
   *
   * @return {String} html markup for list.
   */
  _this.getContributorList = function () {
    return '<ol class="contributors ' + _CONTRIBUTOR_LIST_CLASS + '">' +
        _formatContributorList() +
        '</ol>';
  };

  /**
   * Get formatted html for link to contributor.
   *
   * @param id {String}
   *        contributor code.
   * @return {String} html.
   */
  _this.getContributorLink = function (id) {
    return '<span class="' + _CONTRIBUTOR_LINK_CLASS + '"' +
        ' ' + _CONTRIBUTOR_DATA_ATTRIBUTE + '="' + id + '">' +
        _formatContributorLink(id) +
        '</span>';
  };

  /**
   * Get formatted html for reference to contributor.
   * References position as returned by getContributorList.
   *
   * @param id {String}
   *        contributor code.
   * @return {String} html markup for reference to contributor.
   */
  _this.getContributorReference = function (id) {
    return '<span class="' + _CONTRIBUTOR_REFERENCE_CLASS + '"' +
        ' ' + _CONTRIBUTOR_DATA_ATTRIBUTE + '="' + id + '">' +
        _formatContributorReference(id) +
        '</span>';
  };

  /**
   * Get the formatted name for a contributor.
   *
   * @param id {String}
   *        contributor code
   * @return {String}
   *         name for contributor.
   */
  _this.getName = function (id) {
    var contributor,
        title;

    contributor = _this.getContributor(id);
    id = id.toUpperCase();
    title = null;
    if (contributor) {
      title = contributor.title;
    }

    if (title) {
      return title + ' (' + id + ')';
    } else {
      return id;
    }
  };

  /**
   * Finds all the relevant attribution to provide for a given product.
   *
   * @param product {Product}
   *     The product for which to generate attribution.
   *
   * @return {String}
   *     Attribution markup for the given product.
   */
  _this.getProductAttribution = function (product) {
    var source,
        sources,
        type;

    sources = {}; // Keep a unique list

    // TODO :: Deal with internal- and -scenario variants
    type = product.get('type');

    // Put product.source on first
    source = product.get('source');
    sources[source] = _this.getContributorReference(source);

    // Add in additional sources based on product type

    if (type === 'origin' || type === 'phase-data') {
      // Look for origin-source property and magnitude-source property and
      // add them as contributors if new ids
      source = product.get('origin-source');
      if (source && !sources.hasOwnProperty(source)) {
        sources[source] = _this.getContributorReference(source);
      }

      source = product.get('magnitude-source');
      if (source && !sources.hasOwnProperty(source)) {
        sources[source] = _this.getContributorReference(source);
      }
    } else if (type === 'focal-mechanism' || type === 'moment-tensor') {
      // Look for beachball-source property and add it as contributor if new id
      source = product.get('beachball-source');
      if (source && !sources.hasOwnProperty(source)) {
        sources[source] = _this.getContributorReference(source);
      }
    }

    return Object.keys(sources).reduce(function (previous, current) {
          return previous + sources[current];
        }, '');
  };

  /**
   * Set list of contributors.
   *
   * @param contributors {Array<String>}
   *        list of contributors.
   */
  _this.setContributors = function (contributors) {
    var el;

    // copy
    _contributors = contributors.slice(0);
    // convert to lower case
    _contributors = contributors.map(function (s) {
      return s.toLowerCase();
    });
    // sort
    _contributors.sort(_sortByName);

    // update contributor list (if it exists)
    el = document.querySelector('.' + _CONTRIBUTOR_LIST_CLASS);
    if (el) {
      el.innerHTML = _formatContributorList();
    }
  };

  /**
   * Load a contributor list.
   */
  _this.load = function (url) {
    Xhr.ajax({
      url: url,
      error: _onError,
      success: _onSuccess
    });
  };

  /**
   * Re-render contributor links and references.
   */
  _this.render = function () {
    var els;

    els = Array.prototype.slice.call(
        document.querySelectorAll('.' + _CONTRIBUTOR_LINK_CLASS), 0);
    els.forEach(function (link) {
      var id;
      id = link.getAttribute(_CONTRIBUTOR_DATA_ATTRIBUTE);
      if (id) {
        link.innerHTML = _formatContributorLink(id);
      }
    });

    els = Array.prototype.slice.call(
        document.querySelectorAll('.' + _CONTRIBUTOR_REFERENCE_CLASS), 0);
    els.forEach(function (ref) {
      var id;
      id = ref.getAttribute(_CONTRIBUTOR_DATA_ATTRIBUTE);
      if (id) {
        ref.innerHTML = _formatContributorReference(id);
      }
    });
  };

  /**
   * Call a callback, possibly waiting for attribution data to load.
   *
   * @param callback {Function}
   *        function that is called (with no arguments) once attribution data
   *        has loaded (or failed to load).
   */
  _this.whenReady = function (callback) {
    if (_sourceMap === null) {
      // save callback for when ready
      _whenReady.push(callback);
    } else {
      // ready now
      callback();
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = Attribution();
