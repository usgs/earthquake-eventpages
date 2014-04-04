/* global define */
define([
	'util/Util',
	'util/Xhr',
	'base/TabbedModulePage',
	'tablist/TabList',
	'./TabListUtil'
], function (
	Util,
	Xhr,
	TabbedModulePage,
	TabList,
	TabListUtil
) {
	'use strict';

	var DEFAULTS = {};

	var MAP_IMAGES = [
		{
			title:'Instrumental Intensity',
			suffix:'download/intensity.jpg'
		},
		{
			title:'PGA (%g)',
			suffix:'download/pga.jpg'
		},
		{
			title:'PGV (cm/s)',
			suffix:'download/pgv.jpg'
		},
		{
			title:'PSA 0.3s (%g)',
			suffix:'download/psa03.jpg'
		},
		{
			title:'PSA 1.0s (%g)',
			suffix:'download/psa10.jpg'
		},
		{
			title:'PSA 3.0s (%g)',
			suffix:'download/psa30.jpg'
		},
		{
			title:'Uncertainty',
			suffix:'download/sd.jpg'
		}
	];

	var STATION_LIST = {
		title: 'Station List',
		suffix: 'download/stationlist.xml'
	};

	var FLAG_DESCRIPTIONS = {
		'M': 'Manually flagged',
		'T': 'Outlier',
		'G': 'Glitch (clipped or below noise)',
		'I': 'Incomplete time series',
		'N': 'Not in list of known stations'
	};

	var _translateMmi = function (mmi) {
		var mmiArray = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
				'IX', 'X', 'XI', 'XII'];
		mmi = Math.round(mmi);

		return mmiArray[mmi] || '';
	};

	var _sortByDistance = function (a, b) {
		return parseFloat(a.dist, 10) - parseFloat(b.dist, 10);
	};

	/**
	 * Construct a new ShakemapDetailsPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var ShakemapDetailsPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		this._tablist = null;
		this._shakemap = null;
		this._code = this._options.code;
		TabbedModulePage.call(this, this._options);
	};

	// extend TabbedModulePage.
	ShakemapDetailsPage.prototype = Object.create(TabbedModulePage.prototype);

	ShakemapDetailsPage.prototype._setContentMarkup = function () {
		var products = this._event.properties.products,
		    shakemap;

		if (!products.shakemap) {
			return;
		}

		// with multiple contributors get shakemap product based on code
		if (this._code) {
			shakemap = this._shakemap = this._getProduct(products.shakemap);
		} else {
			shakemap = this._shakemap = products.shakemap[0];
		}

		// Build TabList with all of the shakemap images
		this._tablist = new TabList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			header: shakemap.code, // TODO, what should this be?
			tabs: TabListUtil.CreateTabListData(
				{
					contents: shakemap.contents,
					eventId: shakemap.code,
					dataObject: MAP_IMAGES
				})
		});

		// Add station list to TabList
		this._addStationList();
	};


	ShakemapDetailsPage.prototype._getProduct = function (products) {
		var shakemap;

		for (var i = 0; i < products.length; i++) {
			if (products[i].code === this._code) {
				shakemap = products[i];
			}
		}

		return shakemap;
	};

	/**
	 * Build a list of stations from stationlist.xml
	 */
	ShakemapDetailsPage.prototype._addStationList = function () {
		var title = 'Station List',
		    _this = this;

		// Add tab with station list
		this._tablist.addTab({
			'title': title,
			'content': function () {
				var container = document.createElement('div');
				container.className = 'stations';
				container.innerHTML = '<p>Loading station list data from XML, please wait...</p>';

				_this._getStationData(function (content) {
					// add station list content
					container.innerHTML = content;
					// add click event to toggle details for stations
					container.addEventListener('click', _this._toggleDetails.bind(_this));
				});

				// return panel content
				return container;
			}
		});
	};

	ShakemapDetailsPage.prototype._getStationData = function (callback) {
		var file = this._shakemap.contents[STATION_LIST.suffix],
		    _this = this;

		// get station content and build the station list
		Xhr.ajax({
			url: file.url,
			success: function (data, xhr) {
				callback(_this._buildStationList(_this._buildStationArray(
						xhr.responseXML)));
			},
			error: function () {
				callback('<p class="shakemap-error">Error: Unable to retreive the station list.</p>');
			}
		});
	};

	ShakemapDetailsPage.prototype._buildStationArray = function (xml) {
		var data = this._xmlToJson(xml),
		    shakemapData = data['shakemap-data'][1],
		    stations = this._stations = shakemapData.stationlist.station;

		// sort by distance
		stations.sort(_sortByDistance);

		return stations;
	};

	ShakemapDetailsPage.prototype._buildStationList = function (data) {
		var stations = [],
		    station, acc, vel, dist, components, romanNumeral, title;

		for (var i = 0; i < data.length; i++) {
			station = data[i];
			components = station.comp;

			acc = this._findMaxValue(components, 'acc');
			vel = this._findMaxValue(components, 'vel');

			// check for NaN
			if (typeof vel !== 'string') {
				vel = vel.toFixed(3);
			}

			// check for NaN
			if (typeof acc !== 'string') {
				acc = acc.toFixed(3);
			}

			if (typeof station.dist === 'string') {
				dist = parseFloat(station.dist, 10);
			}

			dist = dist.toFixed(1);

			romanNumeral = _translateMmi(station.intensity);

			// Do not repeat the zip code if it's already part of the name
			if (station.name.indexOf('ZIP Code') === -1) {
				title = '<em>' + station.code + '</em>' + station.name;
			} else {
				title = station.name;
			}

			stations.push([
				'<div class="toggle" data-id="', i ,'">',
					'<h3>', title, '</h3>',
					'<ul class="summary">',
						'<li class="mmi mmi', romanNumeral, '">',
							'<span>', station.intensity, '</span>',
							'<abbr title="Modified Mercalli Intensity">mmi</abbr>',
						'</li>',
						'<li>',
							'<span>', vel ,'</span>',
							'<abbr title="Maximum Horizontal Peak Ground Velocity">pgv</abbr>',
						'</li>',
						'<li>',
							'<span>', acc ,'</span>',
							'<abbr title="Maximum Horizontal Peak Ground Acceleration">pga</abbr>',
						'</li>',
						'<li>',
							'<span>', dist ,'</span>',
							'<abbr title="Distance from Epicenter">dist</abbr>',
						'</li>',
					'</ul>',
					'<a class="expand" data-id="', i ,'">Details</a>',
				'</div>'
			].join(''));
		}

		return stations.join('');
	};


	ShakemapDetailsPage.prototype._buildStationDetails = function (index) {
		var station = this._stations[index],
		    components = station.comp;

		// check for null index id
		if (!index) {
			return;
		}

		return [
				'<dl>',
					'<dt>Type: </dt>',
					'<dd>', (station.insttype === '') ? '--' : station.insttype ,'</dd>',
					'<dt>Location: </dt>',
					'<dd>(', station.lat, ', ', station.lon ,')</dd>',
					'<dt>Source: </dt>',
					'<dd>', station.source ,'</dd>',
				'</dl>',
				this._buildComponentDetails(components),
			].join('');
	};

	ShakemapDetailsPage.prototype._buildComponentDetails = function (components) {
		var componentsMarkup = [],
		    component;

		// check for null
		if (!components) {
			return;
		}

		// When one record exists components is an object not an array
		if(components && !components.length) {
			components = [components];
		}

		for(var i = 0; i < components.length; i++) {
			component = components[i];

			componentsMarkup.push([
				'<tr>',
					'<td>', component.name ,'</td>',
					this._buildTableCell(component.acc),
					this._buildTableCell(component.vel),
					this._buildTableCell(component.psa03),
					this._buildTableCell(component.psa10),
					this._buildTableCell(component.psa30),
				'</tr>'
			].join(''));
		}

		return [
			'<table class="responsive components">',
				'<thead>',
					'<tr>',
						'<th>name</th>',
						'<th>acc</th>',
						'<th>vel</th>',
						'<th>psa03</th>',
						'<th>psa10</th>',
						'<th>psa30</th>',
					'</tr>',
				'</thead>',
				'<tbody>',
						componentsMarkup.join(''),
				'</tbody>',
			'</table>'
		].join('');
	};


	ShakemapDetailsPage.prototype._xmlToJson = function (xml) {
		// based on http://davidwalsh.name/convert-xml-json
		var obj = {},
				    children = [],
				    attrs,
				    attr,
				    nodes,
				    node,
				    nodeName,
				    nodeValue,
				    i,
				    len;

		if (xml.nodeType === 3) {
			return xml.nodeValue;
		}

		if (xml.nodeType === 1) {
			attrs = xml.attributes;
			for (i = 0, len = attrs.length; i < len; i++) {
				attr = attrs.item(i);
				obj[attr.nodeName] = attr.nodeValue;
			}
		}

		if (xml.hasChildNodes()) {
			nodes = xml.childNodes;
			for(i = 0, len = nodes.length; i < len; i++) {
				node = nodes.item(i);
				nodeName = node.nodeName;
				nodeValue = this._xmlToJson(node);
				children.push(nodeValue);
				if (typeof(obj[nodeName]) === 'undefined') {
					obj[nodeName] = nodeValue;
				} else {
					if (typeof(obj[nodeName].push) === 'undefined') {
						obj[nodeName] = [obj[nodeName]];
					}
					obj[nodeName].push(nodeValue);
				}
			}
		}

		// clean up '#text' nodes
		if (children.length === 1 && obj['#text']) {
			return obj['#text'];
		} else if (obj['#text']) {
			delete obj['#text'];
		}

		return obj;
	};


	ShakemapDetailsPage.prototype._toggleDetails = function (e) {
		var target = e.target,
		    container = e.target.parentNode,
		    className,
		    details,
		    detailSection,
		    newSection;

		if (target.nodeName === 'A' && target.classList.contains('expand')) {
			// after creating the section, toggle the details on click
			detailSection = container.querySelector('.details');
			if (detailSection) {
				target.classList.toggle('open');
				detailSection.classList.toggle('details-hidden');
				return;
			}

			className = 'details details-' + target.getAttribute('data-id');
			details = this._buildStationDetails(target.getAttribute('data-id'));
			newSection = document.createElement('div');
			newSection.className = className;
			newSection.innerHTML = details;

			target.classList.toggle('open');
			container.appendChild(newSection);
		}
	};

	ShakemapDetailsPage.prototype._findMaxValue = function (array, value) {
		var values = [],
		    item;

		// Only one value, return value as max
		if (!array.length && array[value]) {
			return parseFloat(array[value].value, 10);
		}

		for (var i = 0; i < array.length; i++) {

			if (array[i].hasOwnProperty(value)) {
				item = array[i][value].value;
			} else {
				item = null;
			}

			if (typeof item === 'string') {
				item = parseFloat(item, 10);
			}

			values.push(item);
		}

		return Math.max.apply(null, values);
	};

	ShakemapDetailsPage.prototype._buildTableCell = function (data) {
		var td;

		// Add flag class for all non-zero flags
		if (data) {
				td = [
					(data.flag !== '0') ? '<td class="flag">' : '<td>',
						parseFloat(data.value, 10).toFixed(3), ' ',
						this._assignFlag(data.flag),
					'</td>'
				].join('');
		} else {
			td = '<td>--</td>';
		}

		return td;
	};

	ShakemapDetailsPage.prototype._assignFlag = function (flag) {
		var markup;

		if (FLAG_DESCRIPTIONS.hasOwnProperty(flag)) {
			markup = '<abbr title="' + FLAG_DESCRIPTIONS[flag] + '">(' +
					flag + ')</abbr>';
		}

		return markup;
	};

	// return constructor
	return ShakemapDetailsPage;
});