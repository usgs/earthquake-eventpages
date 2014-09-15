/* global define */
define([
	'leaflet',
	'impact/ImpactUtil'
], function (
	L,
	ImpactUtil
) {
	'use strict';

	var ContoursLayer = L.GeoJSON.extend({
		initialize: function (contourJson) {

			L.GeoJSON.prototype.initialize.call(this, contourJson, {
				style: function (feature) {
					return {
						color: feature.properties.color,
						weight: feature.properties.weight,
						opacity: 1.0
					};
				},

				onEachFeature: function (feature, layer) {
					var p = feature.properties,
					    roman = ImpactUtil._translateMmi(p.value);

					layer.bindPopup('<div class="roman station-summary-intensity mmi'+
						roman+'">'+roman+'<br><abbr title="Modified Mercalli Intensity">mmi</abbr></div>');
				}
			});
		}
	});
	return ContoursLayer;
});
