/* global define */
define([
  'leaflet',
  'impact/ImpactUtil',
  'base/Formatter',
  'util/Xhr'
], function (
  L,
  ImpactUtil,
  Formatter,
  Xhr
) {
  'use strict';

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
              romanIntensity = ImpactUtil._translateMmi(p.intensity);

          return L.marker(latlng, {
            icon: L.divIcon({
              className: 'station-layer-icon station-mmi'+romanIntensity+'',
              iconSize: [14, 10],
              iconAnchor: [7, 8],
              popupAnchor: [0, -4]
            })
          });
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
          romanIntensity = ImpactUtil._translateMmi(p.intensity);

      var markup = ['<div class="station-popup">',
        '<h2 class="station-title">', this._formatTitle(feature), '</h2>',
        '<ul class="station-summary">',
          '<li class="station-summary-intensity roman mmi', romanIntensity, '">',
            romanIntensity,
            '<br><abbr title="Modified Mercalli Intensity">mmi</abbr></br>',
          '</li>',
          '<li class="station-summary-pgv">',
            this._formatter.number(p.pgv, 3, '&ndash;'),
            '<br><abbr title="Maximum Horizontal Peak Ground Velocity">pgv</abbr></br>',
          '</li>',
          '<li class="station-summary-pga">',
            this._formatter.number(p.pga, 3, '&ndash;'),
            '<br><abbr title="Maximum Horizontal Peak Ground Velocity">pga</abbr></br>',
          '</li>',
          '<li class="station-summary-distance">',
            this._formatter.number(p.distance, 1, '&ndash;'),
            '<br><abbr title="Distance from Epicenter">dist</abbr></br>',
          '</li>',
        '</ul>',
        '<dl class="station-metadata">',
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
            (amplitude.pga&&amplitude.pga.value) ?
                this._formatter.number(amplitude.pga.value, 3) : '&ndash;',
          '</td>',
          '<td class="station-channel-pgv">',
            (amplitude.pgv&&amplitude.pgv.value) ?
                this._formatter.number(amplitude.pgv.value, 3) : '&ndash;',
          '</td>',
          '<td class="station-channel-psa03">',
            (amplitude.psa03&&amplitude.psa03.value) ?
                this._formatter.number(amplitude.psa03.value, 3) : '&ndash;',
          '</td>',
          '<td class="station-channel-psa10">',
            (amplitude.psa10&&amplitude.psa10.value) ?
                this._formatter.number(amplitude.psa10.value, 3) : '&ndash;',
          '</td>',
          '<td class="station-channel-psa30">',
            (amplitude.psa30&&amplitude.psa30.value) ?
                this._formatter.number(amplitude.psa30.value, 3) : '&ndash;',
          '</td>',
        '</tr>',
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
  });
  return ShakeMapStationLayer;
});
