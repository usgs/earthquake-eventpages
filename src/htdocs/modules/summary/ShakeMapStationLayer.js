'use strict';

var Formatter = require('base/Formatter'),
    ImpactUtil = require('base/ImpactUtil'),
    L = require('leaflet'),
    Xhr = require('util/Xhr');


var FLAG_DESCRIPTIONS = {
  'M': 'Manually flagged',
  'T': 'Outlier',
  'G': 'Glitch (clipped or below noise)',
  'I': 'Incomplete time series',
  'N': 'Not in list of known stations'
};


var ShakeMapStationLayer = L.GeoJSON.extend({

  initialize: function (stationJson) {
    var _this = this;

    this._formatter = new Formatter();
    this._layers = {};

    this.stationURL = stationJson;
    this.data = null;

    this.options = {
      pointToLayer: function (feature, latlng) {
        var p = feature.properties,
            romanIntensity = ImpactUtil.translateMmi(p.intensity);

        if (p.network === 'DYFI') {
          return L.marker(latlng, {
            icon: L.divIcon({
              className: 'dyfi-layer-icon dyfi-station-mmi'+romanIntensity+'',
              iconSize: [14, 14],
              iconAnchor: [7, 7],
              popupAnchor: [0, 0]
            })
          });
        } else {
          return L.marker(latlng, {
            icon: L.divIcon({
              className: 'station-layer-icon station-mmi'+romanIntensity+'',
              iconSize: [14, 10],
              iconAnchor: [7, 8],
              popupAnchor: [0, -4]
            })
          });
        }
      },
      onEachFeature: function (feature, layer) {
        layer.options.title = _this._formatTitle(feature, true);
        layer.bindPopup(_this._generatePopupContent(feature),
            {minWidth:300});
      }
    };
  },

  onAdd: function (map) {
    if (this.data === null) {
      Xhr.ajax({
        url: this.stationURL,
        success: (function (layer) {
          return function (data) {
            layer.data = data;
            layer.addData(data);
            L.LayerGroup.prototype.onAdd.call(layer, map);
          };
        })(this)
      });
    } else {
      this.addData(this.data);
      L.LayerGroup.prototype.onAdd.call(this, map);
    }
  },

  _generatePopupContent: function (feature) {
    var p = feature.properties,
        romanIntensity = ImpactUtil.translateMmi(p.intensity);

    var markup = ['<div class="station-popup">',
      '<h2 class="station-title">', this._formatTitle(feature), '</h2>',
      '<ul class="station-summary">',
        '<li class="station-summary-intensity roman mmi', romanIntensity, '">',
          romanIntensity,
          '<br><abbr title="Modified Mercalli Intensity">mmi</abbr></br>',
        '</li>',
        '<li class="station-summary-pga">',
          this._formatter.number(p.pga, 3, '&ndash;'),
          '<br><abbr title="Maximum Horizontal Peak Ground Velocity %g">pga</abbr></br>',
        '</li>',
        '<li class="station-summary-pgv">',
          this._formatter.number(p.pgv, 3, '&ndash;'),
          '<br><abbr title="Maximum Horizontal Peak Ground Velocity cm/s">pgv</abbr></br>',
        '</li>',
        '<li class="station-summary-distance">',
          this._formatter.number(p.distance, 1, '&ndash;'),
          '<br><abbr title="Distance %g">dist</abbr></br>',
        '</li>',
      '</ul>',
      '<dl class="station-metadata horizontal">',
        '<dt class="station-metadata-type">Type</dt>',
          '<dd class="station-metadata-type">',
            (p.instrumentType||'&ndash;'),
          '</dd>',
        '<dt class="station-metadata-location">Location</dt>',
          '<dd class="station-metadata-location">',
            this._formatLocation(feature),
          '</dd>',
        '<dt class="station-metadata-source">Source</dt>',
          '<dd class="station-metadata-source">', (p.source || '&ndash;'), '</dd>',
        '<dt class="station-metadata-intensity">Intensity</dt>',
          '<dd class="station-metadata-intensity">',
            this._formatter.number(p.intensity, 1, '&ndash;'),
          '</dd>',
      '</dl>',
      this._createChannelTable(p.channels),
    '</div>'];

    return markup.join('');
  },

  _createChannelTable: function (channels) {
    var i = 0, numChannels = channels.length;

    var markup = [
      '<table class="station-channels">',
        '<thead>',
          '<tr>',
            '<th scope="col" class="station-channels-name">name</th>',
            '<th scope="col" class="station-channels-pga">pga</th>',
            '<th scope="col" class="station-channels-pgv">pgv</th>',
            '<th scope="col" class="station-channels-psa03">psa03</th>',
            '<th scope="col" class="station-channels-psa10">psa10</th>',
            '<th scope="col" class="station-channels-psa30">psa30</th>',
          '</tr>',
        '</thead>',
        '<tbody>'
    ];

    for (; i < numChannels; i++) {
      markup.push(this._createChannelRow(channels[i]));
    }

    markup.push('</tbody></table>');

    return markup.join('');
  },

  _createAmplitudesObject: function (amplitudes) {
    var amp = {},
        i,
        len = amplitudes.length,
        amplitude = null;

    for (i = 0; i < len; i++) {
      amplitude = amplitudes[i];
      amp[amplitude.name] = amplitude;
    }

    return amp;
  },

  _createChannelRow: function (channel) {
    var amplitude = this._createAmplitudesObject(channel.amplitudes);

    return [
      '<tr>',
        '<th scope="row" class="station-channel-name">',
          channel.name,
        '</th>',
        '<td class="station-channel-pga">',
        this._formatComponent(amplitude.pga),
        '</td>',
        '<td class="station-channel-pgv">',
        this._formatComponent(amplitude.pgv),
        '</td>',
        '<td class="station-channel-psa03">',
          this._formatComponent(amplitude.psa03),
        '<td class="station-channel-psa10">',
          this._formatComponent(amplitude.psa10),
        '</td>',
        '<td class="station-channel-psa30">',
          this._formatComponent(amplitude.psa30),
        '</td>',
      '</tr>'
    ].join('');
  },

  _formatTitle: function (feature, plainText) {
    var p = feature.properties;

    var title = [];

    if (!plainText) { title.push('<span class="station-code">'); }
    title.push(p.code || '&ndash;');
    if (!plainText) { title.push('</span>'); }

    title.push(' ');

    if (!plainText) { title.push('<span class="station-name">'); }
    title.push(p.name || '&ndash;');
    if (!plainText) { title.push('</span>'); }

    return title.join('');
  },

  _formatLocation: function (feature) {
    return ((feature.properties.location) ?
        (feature.properties.location + '<br/>') : '') + ' (' +
        feature.geometry.coordinates[1] + ', ' +
        feature.geometry.coordinates[0] + ')';
  },

  _formatComponent: function (data) {
    var content = [],
        flag,
        value;

    if (data) {
      flag = data.flag;
      value = data.value;

      // Add flag class for all non-zero flags
      if (flag && flag !== '0') {
        content.push('<span class="station-flag">');
        content.push(parseFloat(value, 10).toFixed(3));

        // display flag with title text
        if (FLAG_DESCRIPTIONS.hasOwnProperty(flag)) {
          content.push('<abbr title="' + FLAG_DESCRIPTIONS[flag] + '">(' +
              flag + ')</abbr>');
        } else {
          content.push('(' + flag + ')');
        }
        content.push('</span>');
      } else {
        content.push('<span>');
        content.push(parseFloat(value, 10).toFixed(3));
        content.push('</span>');
      }
    } else {
      content.push('<span>&ndash;</span>');
    }

    return content.join('');
  }
});


module.exports = ShakeMapStationLayer;
