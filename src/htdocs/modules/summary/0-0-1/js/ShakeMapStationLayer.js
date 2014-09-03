/* global define */
define([
	'leaflet',

	'util/Util',
	'util/Xhr'
], function (
	L,

	Util,
	Xhr
) {
	'use strict';

	var ShakeMapStationLayer = L.GeoJSON.extend({

		initialize: function (stationJson) {
			var _this = this;

			// DEV
			_this.firstLayer = null;

			L.GeoJSON.prototype.initialize.call(this, stationJson, {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {
						icon: L.icon({
							iconUrl: 'images/station-icon.png',
							iconSize: [17, 15],
							iconAnchor: [9, 7],
							popupAnchor: [0, -7]
						})
					});
				},
				onEachFeature: function (feature, layer) {
					var lat = feature.geometry.coordinates[1],
					    lng = feature.geometry.coordinates[0];

					layer.options.title = _this._formatTitle(feature, true);
					layer.bindPopup(_this._generatePopupContent(feature),
							{minWidth:300});

					// DEV
					if (_this.firstLayer === null) { _this.firstLayer = layer; }
				}
			});
		},

		// DEV
		onAdd: function () {
			var retVal = L.GeoJSON.prototype.onAdd.apply(this, arguments);

			this.firstLayer.openPopup();

			return retVal;
		},

		_generatePopupContent: function (feature) {
			var p = feature.properties,
			    romanIntensity = this._romanIntensity(p.intensity);

			var markup = ['<div class="station-popup">',
				'<h2 class="station-title">', this._formatTitle(feature), '</h2>',
				'<ul class="station-summary">',
					'<li class="station-summary-intensity mmi', romanIntensity, '">',
						romanIntensity,
						'<abbr title="Modified Mercalli Intensity">mmi</abbr>',
					'</li>',
					'<li class="station-summary-pgv">',
						this._formatDecimal(p.pgv),
						'<abbr title="Maximum Horizontal Peak Ground Velocity">pgv</abbr>',
					'</li>',
					'<li class="station-summary-pga">',
						this._formatDecimal(p.pga),
						'<abbr title="Maximum Horizontal Peak Ground Velocity">pga</abbr>',
					'</li>',
					'<li class="station-summary-distance">',
						this._formatDecimal(p.distance, 1),
						'<abbr title="Distance from Epicenter">dist</abbr>',
					'</li>',
				'</ul>',
				'<dl class="station-metadata">',
					'<dt class="station-metadata-type">Type</dt>',
						'<dd class="station-metadata-type">',
							(p.instrumentType||'--'),
						'</dd>',
					'<dt class="station-metadata-location">Location</dt>',
						'<dd class="station-metadata-location">',
							this._formatLocation(feature),
						'</dd>',
					'<dt class="station-metadata-source">Source</dt>',
						'<dd class="station-metadata-source">', (p.source || '--'), '</dd>',
					'<dt class="station-metadata-intensity">Intensity</dt>',
						'<dd class="station-metadata-intensity">',
							this._formatDecimal(p.intensity, 1),
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
			var amp = this._createAmplitudesObject(channel.amplitudes);

			return [
				'<tr>',
					'<th scope="row" class="station-channel-name">',
						channel.name,
					'</th>',
					'<td class="station-channel-pga">',
						(amp.pga&&amp.pga.value) ?
								this._formatDecimal(amp.pga.value) : '--',
					'</td>',
					'<td class="station-channel-pgv">',
						(amp.pgv&&amp.pgv.value) ?
								this._formatDecimal(amp.pgv.value) : '--',
					'</td>',
					'<td class="station-channel-psa03">',
						(amp.psa03&&amp.psa03.value) ?
								this._formatDecimal(amp.psa03.value) : '--',
					'</td>',
					'<td class="station-channel-psa10">',
						(amp.psa10&&amp.psa10.value) ?
								this._formatDecimal(amp.psa10.value) : '--',
					'</td>',
					'<td class="station-channel-psa30">',
						(amp.psa30&&amp.psa30.value) ?
								this._formatDecimal(amp.psa30.value) : '--',
					'</td>',
				'</tr>',
			].join('');
		},

		_formatTitle: function (feature, plainText) {
			var p = feature.properties;

			var title = [];

			if (!plainText) { title.push('<span class="station-code">'); }
			title.push(p.code || '--');
			if (!plainText) { title.push('</span>'); }

			title.push(' ');

			if (!plainText) { title.push('<span class="station-name">'); }
			title.push(p.name || '--');
			if (!plainText) { title.push('</span>'); }

			return title.join('');
		},

		_formatDecimal: function (value, decimals) {
			var formatted = null;

			if (typeof value === 'undefined' || value === null || value === '') {
				return '--';
			}
			if (typeof decimals === 'undefined' || decimals === null) {
				decimals = 3;
			}

			formatted = parseFloat(value);
			if (isNaN(formatted)) {
				return '--';
			}

			return formatted.toFixed(decimals);
		},

		_formatLocation: function (feature) {
			return ((feature.properties.location) ?
					(feature.properties.location + '<br/>') : '') + ' (' +
					feature.geometry.coordinates[1] + ', ' +
					feature.geometry.coordinates[0] + ')';
		},

		_romanIntensity: function (intensity) {
			var ROMANS = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
					'X', 'XI', 'XII'];

			var index;
			if (isNaN(intensity)) {
				return 'NaN';
			} else {
				index = Math.round(intensity);
			}

			if (index < 0) {
				index = 0;
			}
			if (index > (ROMANS.length - 1)) {
				index = ROMANS.length - 1;
			}

			return ROMANS[index];
		}
	});
	return ShakeMapStationLayer;
});
