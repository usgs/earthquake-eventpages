'use strict';


var BasicPinView = require('core/BasicPinView'),
    CatalogEvent = require('pdl/CatalogEvent'),
    Formatter = require('core/Formatter'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: ImpactSummaryModule
};


var ImpactPinView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();

    _this.event = options.event || CatalogEvent();
  };


  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.createBubble = function () {
    var bubble;

    bubble = document.createElement('span');
    bubble.classList.add('impact-pin-view-bubble');

    return bubble;
  };

  _this.getDyfiBubble = function (summary) {
    var bubble,
        cdi,
        fragment,
        value;

    fragment = document.createDocumentFragment();
    value = summary.properties.cdi;

    if (value !== null) {
      cdi = _formatter.mmi(value);
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('mmi' + cdi);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          cdi,
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="Did You Feel It? Maximum reported intensity.">',
          'DYFI?',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  _this.getPagerBubble = function (summary) {
    var bubble,
        fragment,
        value;

    fragment = document.createDocumentFragment();
    value = summary.properties.alert;

    if (value !== null) {
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('pager-alertlevel-' + value);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          value.toUpperCase(),
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="Prompt Assessment of Global Earthquakes for Response">',
          'PAGER',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  _this.getShakeMapBubble = function (summary) {
    var bubble,
        fragment,
        mmi,
        value;

    fragment = document.createDocumentFragment();
    value = summary.properties.mmi;

    if (value !== null) {
      mmi = _formatter.mmi(value);
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('mmi' + mmi);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          mmi,
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="ShakeMap maximum instrumental intensity.">',
          'ShakeMap',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  _this.renderPinContent = function () {
    var fragment,
        summary;

    Util.empty(_this.content);
    fragment = document.createDocumentFragment();
    summary = _this.event.getSummary();

    fragment.appendChild(_this.getDyfiBubble(summary));
    fragment.appendChild(_this.getShakeMapBubble(summary));
    fragment.appendChild(_this.getPagerBubble(summary));

    _this.content.appendChild(fragment);
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ImpactPinView;
