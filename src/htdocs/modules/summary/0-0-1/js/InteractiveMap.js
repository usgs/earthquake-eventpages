/* global define */
define([
	'leaflet',
	'base/EventModulePage',
	'map/MouseOverLayer',

	'util/Util',
	'util/Xhr'
], function (
	L,
	EventModulePage,
	MouseOverLayer,

	Util,
	Xhr
) {
	'use strict';

	var DEFAULTS = {
	};

	var InteractiveMap = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._map = {};
		this._wrapper = document.createElement('div');
		this._closeBtn = document.createElement('div');
		EventModulePage.call(this, options);
	};

	InteractiveMap.prototype = Object.create(EventModulePage.prototype);

	InteractiveMap.prototype._setContentMarkup = function () {

		var _this = this,
		    lat, latmax, latmin, lng, lngmax, lngmin,
		    _el = document.createElement('div');

		var layerControl = null,
		    baseLayer = null,
		    platesLayer = null,
		    faultsLayer = null,
		    latitude = null,
		    longitude = null,
		    epicenterMarker;

		Util.addClass(this._content, 'summary-interactive-map-wrapper');
		Util.addClass(_el, 'summary-interactive-map');
		Util.addClass(this._closeBtn, 'summary-interactive-map-close');

		this._closeBtn.innerHTML = 'CLOSE';
		_el.innerHTML = '';

		this._closeBtn.setAttribute('title', 'Close');
		this._bindCloseEvent();

		this._map = new L.Map(_el, {
			center: [0.0, 0.0],
			zoom: 2,
			zoomAnimation: false,
			attributionControl: false
		});

		layerControl = new L.Control.Layers();

		// Basic greyscale map
		baseLayer = new L.TileLayer(
				'http://earthquake.usgs.gov/basemap/tiles/natgeo_hires/{z}/{y}/{x}.jpg');
		this._map.addLayer(baseLayer);
		layerControl.addBaseLayer(baseLayer, 'USGS Topography');

		// Plates
		platesLayer = new L.TileLayer(
				'http://earthquake.usgs.gov/basemap/tiles/plates/{z}/{x}/{y}.png');
		this._map.addLayer(platesLayer);
		layerControl.addOverlay(platesLayer, 'Tectonic Plates');

		if (this._event) {
			// Do some event-specific stuff if the event is defined
			latitude = this._event.geometry.coordinates[1];
			longitude = this._event.geometry.coordinates[0];

			if (latitude >= 24.6 && latitude <= 50.0 && longitude >= -125.0 && longitude <= -65.0) {
				// Add faults layer, this is a US event
				faultsLayer = new L.MouseOverLayer({
					tileUrl: 'http://earthquake.usgs.gov/basemap/tiles/faults/{z}/{x}/{y}.png',
					dataUrl: 'http://earthquake.usgs.gov/basemap/tiles/faults/{z}/{x}/{y}.grid.json?callback={cb}',
					tiptext: '{NAME}'
				});
				this._map.addLayer(faultsLayer);
				layerControl.addOverlay(faultsLayer, 'U.S. Faults');
			}

			// Place a marker at the earthquake location
			epicenterMarker = new L.Marker([latitude, longitude], {
				icon: new L.Icon({
					iconUrl: 'images/star.png',
					iconSize: [32, 32],
					iconAnchor: [16, 16]
				})
			});
			epicenterMarker.bindPopup([
				'Epicenter',
				' ',
				'M',
				this._event.properties.mag
			].join(''));
			this._map.addLayer(epicenterMarker);

			if (this._event.properties.products.geoserve) {
				Xhr.ajax({
					url: this._event.properties.products.geoserve[0].contents['geoserve.json'].url,
					success: function (data) {
						var cities = data.cities,
						    numCities = cities.length,
						    i = null,
						    city = null,
						    cityMarker = null;

						for (i = 0; i < numCities; i++) {
							city = cities[i];
							cityMarker = new L.CircleMarker([city.latitude, city.longitude], {
								stroke: true,
								color: '#333',
								weight: 1,
								opacity: 1.0,
								fill: true,
								fillColor: '#eee',
								fillOpacity: 1.0,
								radius: 5
							});

							cityMarker.bindPopup([
								city.name, ' ',
								'<span class="city-distance">',
									city.distance, 'km from epicenter',
								'</span>'
							].join(''));
							_this._map.addLayer(cityMarker);

						}

						_this._map.invalidateSize();

						if (_this._event) {
							// Show a 2deg map centered on earthquake epicenter)
							lat = _this._event.geometry.coordinates[1];
							lng = _this._event.geometry.coordinates[0];

							latmin = Math.max(lat - 2.0, -90.0);
							latmax = Math.min(lat + 2.0, 90.0);

							lngmin = lng - 2.0;
							lngmax = lng + 2.0;

							_this._map.fitBounds([[latmax, lngmin], [latmin, lngmax]]);
						}
					}
				});
			}
		}

		this._map.addControl(layerControl);

		this._content.appendChild(_el);
		this._content.appendChild(this._closeBtn);


	};


	InteractiveMap.prototype.show = function (container) {
		var lat, latmin, latmax,
		    lng, lngmin, lngmax;

		container = container || this._content;

		if (container) {
			container.appendChild(this._wrapper);
			this._map.invalidateSize();

			if (this._event) {
				// Show a 2deg map centered on earthquake epicenter)
				lat = this._event.geometry.coordinates[1];
				lng = this._event.geometry.coordinates[0];

				latmin = Math.max(lat - 2.0, -90.0);
				latmax = Math.min(lat + 2.0, 90.0);

				lngmin = lng - 2.0;
				lngmax = lng + 2.0;

				this._map.fitBounds([[latmax, lngmin], [latmin, lngmax]]);
			}
		}
	};


	InteractiveMap.prototype._bindCloseEvent = function () {
		//var _this = this;

		Util.addEvent(this._closeBtn, 'click', function () {
			//_this._wrapper.parentNode.removeChild(_this._wrapper);
			window.history.go(-1);
		});
	};

	return InteractiveMap;
});
