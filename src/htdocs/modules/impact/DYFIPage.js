'use strict';

var Attribution = require('base/Attribution'),
    Collection = require('mvc/Collection'),
    DataTable = require('mvc/DataTable'),
    EventModulePage = require('base/EventModulePage'),
    ImpactUtil = require('base/ImpactUtil'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr'),

    TabListUtil = require('./TabListUtil');


var DEFAULTS = {};

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
    className: 'location',
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
    className: 'mmi',
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
    className: 'numResp',
    title: 'Responses',
    format: function (response) {
      return response.nresp;
    }
  },
  {
    className: 'distance',
    title: 'Distance',
    format: function (response) {
      return response.dist;
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
  EventModulePage.call(this, options);
};

DYFIPage.prototype = Object.create(EventModulePage.prototype);

DYFIPage.prototype._setHeaderMarkup = function () {
  EventModulePage.prototype._setHeaderMarkup.apply(this);
  this._header.querySelector('h2').insertAdjacentHTML('beforeend',
      ' - <a href="#impact_tellus">Tell Us!</a>');
};

DYFIPage.prototype._setContentMarkup = function () {
  var products = this._event.properties.products,
      dyfi, tablistDiv;
  if (!products.dyfi) {
    return;
  }

  dyfi = this._dyfi = products.dyfi[0];

  this._content.innerHTML = '<small class="attribution">Data Source ' +
      Attribution.getContributorReference(dyfi.source) +
      '</small>';

  // Tablist element
  tablistDiv = document.createElement('div');
  tablistDiv.className = 'dyfi-tablist';

  /* creates tab list */
  this._tablist = new TabList({
    el: this._content.appendChild(tablistDiv),
    tabPosition: 'top',
    tabs: TabListUtil.CreateTabListData({
      contents:dyfi.contents,
      eventId:dyfi.code,
      dataObject:MAP_GRAPH_IMAGES,
      callback:this._getUseMap,
      object:this
    })
  });

  if (!dyfi.contents.hasOwnProperty('cdi_zip.xml')) {
    return;
  }

  this._addDyfiResponsesTab();

};

DYFIPage.prototype._addDyfiResponsesTab = function () {
  var title = 'DYFI Responses',
      _this = this;

  // Add tab with station list
  this._tablist.addTab({
    'title': title,
    'content': function () {
      var container = document.createElement('div');
      container.className = 'dyfi-responses';
      container.innerHTML =
          '<p>Loading DYFI Responses data from XML,please wait...</p>';

      _this._getDYFIResponses(function (responses) {
        _this._responseTable = new DataTable({
          el: container,
          className: 'tabular responsive dyfi',
          collection: responses,
          emptyMarkup: '<p class="error alert">No Response Data Exists</p>',
          columns: RESPONSE_DATA_COLUMNS,
          sorts: RESPONSE_DATA_SORTS,
          defaultSort: 'distance'
        });

        if (responses.data().length > 10) {
          _this._addToggleButton(container,
              container.querySelector('.datatable-data'));
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

  button.innerHTML = 'See All Responses';
  button.className = 'view-all';

  button.addEventListener('click', function (/*evt*/) {
    if (table.classList.contains('full-list')) {
      table.classList.remove('full-list');
      button.innerHTML = 'Show All Responses';
    } else {
      table.classList.add('full-list');
      button.innerHTML = 'Show Only First 10 Responses';
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

  EventModulePage.prototype._setFooterMarkup.apply(this);
};


module.exports = DYFIPage;
