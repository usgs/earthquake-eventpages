'use strict';

var Attribution = require('base/Attribution'),
    Collection = require('mvc/Collection'),
    DataTable = require('mvc/DataTable'),
    Formatter = require('base/Formatter'),
    ProductSummarizer = require('base/ProductSummarizer'),
    SummaryDetailsPage = require('base/SummaryDetailsPage'),
    ImpactFormatter = require('impact/Formatter'),
    ImpactUtil = require('base/ImpactUtil'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr'),

    TabListUtil = require('./TabListUtil');


var DEFAULTS = {
  productTypes: ['dyfi'],
  hash: 'dyfi'
};

/* sets up titles and images for tabs */
var MAP_GRAPH_IMAGES = [
  {
    title:'Intensity Map',
    suffix:'_ciim.jpg',
    usemap:'imap_base',
    mapSuffix:'_ciim_imap.html'
  },
  {
    title:'Geocoded Map',
    suffix:'_ciim_geo.jpg',
    usemap:'imap_geo',
    mapSuffix:'_ciim_geo_imap.html'
  },
  {
    title:'Zoom Map',
    suffix:'_ciim_zoom.jpg',
    usemap:'imap_zoom',
    mapSuffix:'_ciim_zoom_imap.html'
  },
  {
    title:'Zoom Out Map',
    suffix:'_ciim_zoomout.jpg',
    usemap:'imap_zoomout',
    mapSuffix:'_ciim_zoomout_imap.html'
  },
  {
    title:'Intensity Vs. Distance',
    suffix:'_plot_atten.jpg'
  },
  {
    title:'Responses Vs. Time',
    suffix:'_plot_numresp.jpg'
  }
];

var RESPONSE_DATA_COLUMNS = [
  {
    className: 'dyfi-response-location',
    title: 'Location',
    format: function (response) {
      return response.name + ', ' + response.state + ' ' + response.zip +
          '<small>' + response.country + '</small>';
    },
    downloadFormat: function (response) {
      return response.name + ', ' + response.state + ' ' + response.zip +
          response.country;
    },
    header: true
  },
  {
    className: 'dyfi-response-mmi',
    title: 'MMI',
    format: function (response) {
      var roman = ImpactUtil.translateMmi(response.cdi);
      return '<span class="mmi' + roman + '">' + roman + '</span>';
    },
    downloadFormat: function (response) {
      return ImpactUtil.translateMmi(response.cdi);
    }
  },
  {
    className: 'dyfi-response-numResp',
    title: 'Responses',
    format: function (response) {
      return response.nresp;
    }
  },
  {
    className: 'dyfi-response-distance',
    title: 'Distance',
    format: function (response) {
      return response.dist;
    }
  },
  {
    className: 'dyfi-response-latitude',
    title: 'Latitude',
    format: function (response) {
      return ImpactFormatter.latitude(response.lat);
    }
  },
  {
    className: 'dyfi-response-longitude',
    title: 'Longitude',
    format: function (response) {
      return ImpactFormatter.longitude(response.lon);
    }
  }
];

var RESPONSE_DATA_SORTS = [
  {
    id: 'location',
    title: 'Location',
    sortBy: function (response) {
      return response.name;
    }
  },
  {
    id: 'mmi',
    title: 'MMI',
    sortBy: function (response) {
      return response.cdi;
    },
    descending: true
  },
  {
    id: 'numResp',
    title: 'Responses',
    sortBy: function (response) {
      return response.nresp;
    },
    descending: true
  },
  {
    id: 'zip',
    title: 'Zip Code',
    sortBy: function (response) {
      if (response.zip !== '') {
        return response.zip;
      }
      else {
        return response.name;
      }
    }
  },
  {
    id: 'distance',
    title: 'Distance',
    sortBy: function (response) {
      return response.dist;
    }
  }
];


/* creates map page and sets up the content */
var DYFIPage = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});
  this._dyfi = null;
  this._formatter = options.formatter || new Formatter();
  this._responseTable = null;
  this._tablist = null;
  SummaryDetailsPage.call(this, options);
};

DYFIPage.prototype = Object.create(SummaryDetailsPage.prototype);

DYFIPage.prototype.destroy = function () {
  this._dyfi = null;
  this._formatter = null;
  if (this._responseTable !== null) {
    this._responseTable.destroy();
    this._responseTable = null;
  }
  if (this._tablist !== null) {
    this._tablist.destroy();
    this._tablist = null;
  }
  // call parent destroy
  SummaryDetailsPage.prototype.destroy.call(this);
};

DYFIPage.prototype._setHeaderMarkup = function () {
  SummaryDetailsPage.prototype._setHeaderMarkup.apply(this);
  this._header.querySelector('h2').insertAdjacentHTML('beforeend',
      ' - <a href="#impact_tellus">Tell Us!</a>');
};

DYFIPage.prototype.getDetailsContent = function (dyfi) {
  var el = document.createElement('div'),
      tablistDiv;

  this._dyfi = dyfi;

  el.classList.add('dyfi');
  el.innerHTML = '<small class="attribution">Data Source ' +
      Attribution.getContributorReference(dyfi.source) +
      '</small>' +
      '<div class="dyfi-tablist"></div>';

  // Tablist element
  tablistDiv = el.querySelector('.dyfi-tablist');

  if (dyfi.status.toUpperCase() === 'DELETE') {
    tablistDiv.innerHTML = '<p class="alert info">Product Deleted</p>';
  } else {
    /* creates tab list */
    this._tablist = new TabList({
      el: tablistDiv,
      tabPosition: 'top',
      tabs: TabListUtil.CreateTabListData({
        contents:dyfi.contents,
        eventId:dyfi.code,
        dataObject:MAP_GRAPH_IMAGES,
        callback:this._getUseMap,
        object:this
      })
    });

    if (dyfi.contents.hasOwnProperty('cdi_zip.xml')) {
      this._addDyfiResponsesTab();
    }
  }

  return el;
};

DYFIPage.prototype._getSummaryMarkup = function (product) {
  return ProductSummarizer.getDYFISummary(product);
};

DYFIPage.prototype._addDyfiResponsesTab = function () {
  var title = 'DYFI Responses',
      _this = this;

  // Add tab with station list
  this._tablist.addTab({
    'title': title,
    'content': function () {
      var container = document.createElement('div'),
          el;
      container.className = 'dyfi-responses';
      container.innerHTML =
          '<p>Loading DYFI Responses data from XML,please wait...</p>';

      _this._getDYFIResponses(function (responses) {
        _this._responseTable = new DataTable({
          el: container,
          className: 'dyfi-response-table',
          collection: responses,
          emptyMarkup: '<p class="error alert">No Response Data Exists</p>',
          columns: RESPONSE_DATA_COLUMNS,
          sorts: RESPONSE_DATA_SORTS,
          defaultSort: 'distance'
        });

        el = container.querySelector('.datatable-data');
        el.classList.add('horizontal-scrolling');
        if (responses.data().length > 10) {
          _this._addToggleButton(container, el);
        }
      });

      // return panel content
      return container;
    }
  });
};

DYFIPage.prototype._getDYFIResponses = function(callback) {

  var _this = this;
  Xhr.ajax({
    url: this._dyfi.contents['cdi_zip.xml'].url,
    success: function (data, xhr) {
      callback(_this._buildResponsesCollection(xhr.responseXML));
    },
    error: function () {
      var output = document.createElement('p');
      output.className = 'dyfi-error';
      output.innerHTML = 'Error: Unable to retreive DYFI responses.';
      _this._content.appendChild(output);
    }
  });
};

DYFIPage.prototype._buildResponsesCollection = function (xmlDoc) {

  var data = xmlDoc.getElementsByTagName('location'),
      responsesArray = [],
      locationName, locations, location,
      node, nodeName, nodeValue;

  for (var x = 0; x < data.length; x++) {

    locationName = data[x].getAttribute('name');
    locations = data[x].childNodes;
    location = {
      id: x,  // Assign an ID for sorting caching
      zip: '' // Provide empty default to prevent undefined
    };

    for (var i = 0; i < locations.length; i++) {

      node = locations[i];
      nodeName = node.nodeName;
      nodeValue = node.textContent;

      if (nodeName === 'name' ||
          nodeName === 'state' ||
          nodeName === 'country' ||
          nodeName === 'zip') {
        location[nodeName] = nodeValue;
      } else if (
          nodeName === 'cdi' ||
          nodeName === 'dist' ||
          nodeName === 'lat' ||
          nodeName === 'lon') {
        location[nodeName] = parseFloat(nodeValue);
      } else if (nodeName === 'nresp') {
        location[nodeName] = parseInt(nodeValue, 10);
      }
    }

    // determine country/ add zip code to name
    if (locationName.length === 5) {
      location.country = 'United States of America';
      location.zip = locationName;
    } else {
      location.state = locationName.split('::')[1];
      location.country = locationName.split('::')[2];
    }

    responsesArray.push(location);
  }

  return new Collection(responsesArray);
};

DYFIPage.prototype._addToggleButton = function (container, table) {
  var button = container.appendChild(document.createElement('button'));

  button.innerHTML = 'Show All Locations';
  button.className = 'view-all';

  button.addEventListener('click', function (/*evt*/) {
    if (table.classList.contains('full-list')) {
      table.classList.remove('full-list');
      button.innerHTML = 'Show All Locations';
    } else {
      table.classList.add('full-list');
      button.innerHTML = 'Show Only 10 Locations';
    }
  });
};

DYFIPage.prototype._setFooterMarkup = function () {
  var links;

  links = document.createElement('section');
  links.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="/research/dyfi/">' +
            'Scientific Background on Did You Feel It?' +
          '</a>' +
        '</li>' +
      '<ul>';

  this._footer.appendChild(links);

  SummaryDetailsPage.prototype._setFooterMarkup.apply(this);
};


module.exports = DYFIPage;
