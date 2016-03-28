'use strict';


var Attribution = require('core/Attribution'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'scientific-summary';
_TITLE = 'Scientific Summary';
_TYPES = [
  'origin',
  'phase-data',
  'moment-tensor',
  'focal-mechanism',
  'finite-fault',
  'scitech-link'
];

_DEFAULTS = {
  mtFillColor: '#6ea8ff'
};


var ScientificSummaryModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _mtFillColor;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (options) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _formatter = options.formatter || Formatter();
    _mtFillColor = options.mtFillColor;
  };


  _this.destroy = Util.compose(function () {
    _formatter = null;
    _mtFillColor = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getFiniteFaultTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Finite Fault</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getFocalMechanismTable = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Focah Mechanism</h2>');
      // TODO :: Render the summary table
    }

    return markup.join('');
  };

  _this.getMomentTensorTable = function (products) {
    var fragment,
        table,
        tbody,
        thead,
        title,
        wrapper;

    fragment = document.createDocumentFragment();

    if (products.length) {
      title = fragment.appendChild(document.createElement('h2'));
      wrapper = fragment.appendChild(document.createElement('div'));
      table = wrapper.appendChild(document.createElement('table'));
      thead = table.appendChild(document.createElement('thead'));
      tbody = table.appendChild(document.createElement('tbody'));

      title.innerHTML = 'Moment Tensor';
      wrapper.classList.add('horizontal-scrolling');
      table.classList.add('table-summary');
      table.classList.add('table-moment-tensor-summary');

      thead.innerHTML = [
        '<tr>',
          '<th scope="col">Catalog</th>',
          '<th scope="col">Tensor</th>',
          '<th scope="col">Magnitude and Type</th>',
          '<th scope="col">Depth</th>',
          '<th scope="col">% <abbr title="Double Couple">DC</abbr></th>',
          '<th scope="col">Source</th>',
        '</tr>'
      ].join('');

      tbody.appendChild(products.map(_this.getMomentTensorTableRow).reduce(
        function (fragment, row) {
          if (row !== null) {
            fragment.appendChild(row);
          }
          return fragment;
        }, document.createDocumentFragment()
      ));
    }

    return fragment;
  };

  _this.getMomentTensorTableRow = function (product, index) {
    var beachball,
        preferred,
        row,
        tensor;

    tensor = Tensor.fromProduct(product);
    row = document.createElement('tr');
    preferred = (index === 0);

    if (preferred) {
      row.classList.add('preferred');
    }

    row.innerHTML = [
      '<th scope="row">',
        _this.getProductLinkMarkup(product, preferred),
      '</th>',
      '<td class="beachball"></td>',
      '<td>',
        _formatter.magnitude(
          tensor.magnitude,
          product.getProperty('derived-magnitude-type') || 'Mw'
        ),
      '</td>',
      '<td>',
        _formatter.depth(tensor.depth, 'km'),
      '</td>',
      '<td>',
        Math.round(tensor.percentDC * 100) + ' %',
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    beachball = BeachBallView({
      el: row.querySelector('.beachball'),
      fillColor: _mtFillColor,
      labelAxes: false,
      labelPlanes: false,
      size: 30,
      tensor: tensor
    });

    beachball.render();
    beachball.destroy();
    beachball = null;

    return row;
  };

  _this.getOriginProducts = function (ev) {
    var products;

    if (ev) {
      products = ev.getProducts('origin').map(function (origin) {
        var phase;

        // Find a corresponding phase-data product
        phase = ev.getProductById('phase-data', origin.get('source'),
            origin.get('code'));

        // Prefer the phase-data product if it is at least as new as the origin
        if (phase && phase.get('updateTime') >= origin.get('updateTime')) {
          return phase;
        } else {
          return origin;
        }
      });
    } else {
      products = [];
    }

    return products;
  };

  _this.getOriginTable = function (products) {
    var markup;

    if (products.length) {
      markup = [
        '<h2>Origin</h2>',
        '<div class="horizontal-scrolling">',
          '<table class="table-summary table-origin-summary">',
            '<thead>',
              '<tr>',
                '<th scope="col">Catalog</th>',
                '<th scope="col"><abbr title="Magnitude">Mag</abbr></th>',
                '<th scope="col">Time</th>',
                '<th scope="col">Depth</th>',
                '<th scope="col">Status</th>',
                '<th scope="col">Location</th>',
                '<th scope="col">Source</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              products.map(_this.getOriginTableRow).join(''),
            '</tbody>',
          '</table>',
        '</div>'
      ];
    } else {
      markup = [];
    }

    return markup.join('');
  };

  _this.getOriginTableRow = function (product, index) {
    var preferred,
        rowClass;

    preferred = (index === 0);
    rowClass = preferred ? ' class="preferred"' : '';

    return [
      '<tr', rowClass, '>',
        '<th scope="row">',
          _this.getProductLinkMarkup(product, preferred),
        '</th>',
        '<td>',
          _formatter.magnitude(
            product.getProperty('magnitude'),
            product.get('magnitude-type')
          ),
        '</td>',
        '<td>',
          _formatter.time(new Date(product.getProperty('eventtime')), false),
        '</td>',
        '<td>',
          _formatter.depth(product.getProperty('depth')),
        '</td>',
        '<td>',
          product.getProperty('review-status').toUpperCase(),
        '</td>',
        '<td>',
          _formatter.location(
            product.getProperty('latitude'),
            product.getProperty('longitude')
          ),
        '</td>',
        '<td>',
          Attribution.getProductAttribution(product),
        '</td>',
      '</tr>'
    ].join('');
  };

  _this.getProductLinkMarkup = function (product, preferred) {
    var markup,
        type;

    markup = [];
    type = product.get('type');

    // phase-data are actually rendered by the origin module
    if (type === 'phase-data') {
      type = 'origin';
    }

    if (preferred) {
      markup.push('<abbr title="Preferred ' + type +
        '" class="material-icons">check</abbr>');
    }

    markup.push('<a href="#' + type + '?source=' + product.get('source') +
        '&amp;code=' + product.get('code') + '">' +
      product.getProperty('eventsource').toUpperCase() +
    '</a>');

    return markup.join('');
  };

  _this.getScitechLinks = function (products) {
    var markup;

    markup = [];

    if (products.length) {
      markup.push('<h2>Scientific and Technical Links</h2>');
      // TODO :: Render the list
    }

    return markup.join('');
  };

  _this.render = function () {
    // var buf,
    var ev,
        faults,
        fragment,
        links,
        mechs,
        origins,
        tensors;

    // buf = [];
    fragment = document.createDocumentFragment();
    ev = _this.model.get('event');

    faults = ev.getProducts('finite-fault');
    links = ev.getProducts('scitech-link');
    mechs = ev.getProducts('focal-mechanism');
    origins = _this.getOriginProducts(ev);
    tensors = ev.getProducts('moment-tensor');

    // buf.push(_this.getOriginTable(origins));
    // buf.push(_this.getMomentTensorTable(tensors));
    // buf.push(_this.getFocalMechanismTable(mechs));
    // buf.push(_this.getFiniteFaultTable(faults));
    // buf.push(_this.getScitechLinks(links));

    fragment.appendChild(_this.getMomentTensorTable(tensors));

    _this.header.innerHTML = '';
    // _this.content.innerHTML = buf.join('');
    Util.empty(_this.content);
    _this.content.appendChild(fragment);
    _this.footer.innerHTML = '';
  };

  _initialize(options);
  options = null;
  return _this;
};


ScientificSummaryModule.ID = _ID;
ScientificSummaryModule.TITLE = _TITLE;
ScientificSummaryModule.TYPES = _TYPES;


module.exports = ScientificSummaryModule;
