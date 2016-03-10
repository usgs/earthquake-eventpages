'use strict';

var Collection = require('mvc/Collection'),
    ContentView = require('core/ContentView'),
    DataTable = require('mvc/DataTable'),
    ImpactUtil = require('base/ImpactUtil'),
    Formatter = require('core/Formatter');

var _NO_CONTENT_MESSAGE = 'No Responses available.';

/* Formatter for RESPONSE_DATA_COLUMNS */
var formatter = Formatter();

/* Array of Column Objects for Responses DataTable */
var RESPONSE_DATA_COLUMNS = [
  {
    className: 'dyfi-response-location',
    title: 'Location',
    downloadTitle: 'City\tState/Region\tCountry\tZip Code',
    format: function (response) {
      return formatter.dyfiLocation(response);
    },
    downloadFormat: function (response) {
      var country,
          location,
          region,
          zip;

      country = response.country;
      location = response.name;
      region = response.state;
      zip = response.zip;

      return [location, region, country, zip].join('\t');
    }
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
      return response.dist + ' km';
    }
  },
  {
    className: 'dyfi-response-latitude',
    title: 'Latitude',
    format: function (response) {
      return formatter.latitude(response.lat);
    },
    downloadFormat: function (response) {
      return response.lat;
    }
  },
  {
    className: 'dyfi-response-longitude',
    title: 'Longitude',
    format: function (response) {
      return formatter.longitude(response.lon);
    },
    downloadFormat: function (response) {
      return response.lon;
    }
  }
];

/* Array of sort objects for use by DataTable */
var RESPONSE_DATA_SORTS = [
  {
    id: 'city',
    title: 'City',
    sortBy: function (response) {
      return response.name;
    }
  },
  {
    id: 'country',
    title: 'Country',
    sortBy: function (response) {
      return response.country;
    }
  },
  {
    id: 'distance',
    title: 'Distance',
    sortBy: function (response) {
      return response.dist;
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
    id: 'state',
    title: 'Region / State',
    sortBy: function (response) {
      return response.state;
    }
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
  }
];

/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "stationlist.json" for a given product. The `options.model`
 * should be of type {Content}.
 *
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 * @param options.formatter {Formatter}
 *     The formatter object to use for formatting intrinsic values.
 */
var DYFIResponsesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  /**
   * Add a toggle button to the reponses DataTable.
   *
   * @param containter
   *        The container element that the button should be added to.
   */
  _this.addToggleButton = function (container) {
    _this.button = container.appendChild(document.createElement('button'));
    _this.button.innerHTML = 'See All Responses';
    _this.button.className = 'view-all';
    _this.onToggleButtonClick = _this.onToggleButtonClick.bind(_this);
    _this.button.addEventListener('click', _this.onToggleButtonClick);
    container.appendChild(_this.button);
  };

  /**
   * Build a response collection from the DYFI xmlDoc.
   *
   * @param xmlDoc xmlObject
   *        the xml document to parse.
   * @return Collection
   *         A collection of DYFI responses.
   */
  _this.buildResponsesCollection = function (xmlDoc) {
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

  /**
   * Renders the default error message. Called if an error occurs during the
   * data fetch.
   *
   */
  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = _NO_CONTENT_MESSAGE;
  };


  /**
   * Renders the list of responses. Called when data is successfully fetched.
   *
   */
  _this.onSuccess = function (responseText, xhr) {
    var responses = _this.buildResponsesCollection(xhr.responseXML);

    _this.responseTable = DataTable({
      el: _this.el,
      className: 'dyfi-response-table',
      collection: responses,
      emptyMarkup: '<p class="error alert">No Response Data Exists</p>',
      columns: RESPONSE_DATA_COLUMNS,
      sorts: RESPONSE_DATA_SORTS,
      defaultSort: 'distance'
    });

    _this.responseTableEl = _this.el.querySelector('.datatable-data');
    _this.responseTableEl.classList.add('horizontal-scrolling');
    if (responses.data().length > 10) {
      _this.addToggleButton(_this.el);
    }
  };

  /**
   * Toggle the Response list size, either all responses, or the last 10.
   *
   */
  _this.onToggleButtonClick = function () {
    if (_this.responseTableEl.classList.contains('full-list')) {
      _this.responseTableEl.classList.remove('full-list');
      _this.button.innerHTML = 'Show All Responses';
    } else {
      _this.responseTableEl.classList.add('full-list');
      _this.button.innerHTML = 'Show Only 10 Responses';
    }
  };

  _initialize(options);
  options = null;
  return _this;
};

DYFIResponsesView.NO_CONTENT_MESSAGE = _NO_CONTENT_MESSAGE;

module.exports = DYFIResponsesView;
