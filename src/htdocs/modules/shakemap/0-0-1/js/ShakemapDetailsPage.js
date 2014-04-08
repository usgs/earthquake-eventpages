/* global define */
define([
	'util/Util',
	'util/Xhr',
	'base/EventModulePage',
	'tablist/TabList',
	'base/ContentsXML'
], function (
	Util,
	Xhr,
	EventModulePage,
	TabList,
	ContentsXML
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
	 * Converts XML into JSON
	 *
	 * @param  {object} xml,
	 *         xml object returned by XHR response
	 *
	 * @return {object}
	 *         JSON object returned
	 */
	var _xmlToJson = function (xml) {
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
				nodeValue = _xmlToJson(node);
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
		this._code = this._options.code || null;
		EventModulePage.call(this, this._options);
	};

	// extend EventModulePage.
	ShakemapDetailsPage.prototype = Object.create(EventModulePage.prototype);

	ShakemapDetailsPage.prototype._setContentMarkup = function () {
		var products = this._event.properties.products,
		    tablistDiv = document.createElement('div'),
		    shakemap;

		if (!products.shakemap) {
			return;
		}

		tablistDiv.className = 'shakemap';

		// with multiple contributors get shakemap product based on code
		if (this._code) {
			shakemap = this._shakemap = this._getProduct(products.shakemap);
		} else {
			shakemap = this._shakemap = products.shakemap[0];
		}

		// Build TabList with all of the shakemap images
		this._tablist = new TabList({
			el: this._content.appendChild(tablistDiv),
			tabPosition: 'right',
			header: shakemap.code, // TODO, what should this be?
			tabs: this._createTabListData(
				{
					contents: shakemap.contents
				})
		});

		// Add station list to TabList
		this._addStationList();
	};

	/**
	 * Generate array of tab content for tablist
	 *
	 * @param  {object} options,
	 *         shakemap downloadable contents.
	 *
	 * @return {array}
	 *         array of tablist objects including a tab title and content markup.
	 */
	ShakemapDetailsPage.prototype._createTabListData = function (options) {
		var contents = options.contents,
		    tablist = [],
		    imageName,
		    image,
		    content;

		if (contents === null) {
			return tablist;
		}

		for (var i = 0; i < MAP_IMAGES.length; i++) {
			image = MAP_IMAGES[i];
			imageName = image.suffix;

			if (contents.hasOwnProperty(imageName)) {
				content = '<img src="' + contents[imageName].url + '" />';

				tablist.push({
					title: image.title,
					content: content
				});
			}
		}

		return tablist;
	};

	/**
	 * When a product code is specified, return the corresponding
	 * shakemap product.
	 *
	 * @param  {array} products,
	 *         an array of shakemap products
	 *
	 * @return {object}
	 *         shakemap object that matches the code
	 */
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
	 * Build a list of stations from stationlist.xml, these stations have
	 * an expandable details section. Add a station list tab to the the tablist.
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
				container.innerHTML =
						'<p>Loading station list data from XML,please wait...</p>';

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

	/**
	 * Download the stationlist.xml
	 *
	 * @param  {Function} callback,
	 *         callback function to display the station list markup
	 *
	 */
	ShakemapDetailsPage.prototype._getStationData = function (callback) {
		var file = this._shakemap.contents[STATION_LIST.suffix],
		    _this = this;

		if (!file) {
			return '<p>No station list exists.</p>';
		}

		// get station content and build the station list
		Xhr.ajax({
			url: file.url,
			success: function (data, xhr) {
				callback(_this._buildStationList(_this._buildStationArray(
						xhr.responseXML)));
			},
			error: function () {
				callback('<p class="shakemap-error">' +
						'Error: Unable to retreive the station list.</p>');
			}
		});
	};

	/**
	 * Build array of station data, sort by distance
	 *
	 * @param  {object} xml,
	 *         XML Dom object from the XHR response
	 *
	 * @return {array}
	 *         array of station objects
	 */
	ShakemapDetailsPage.prototype._buildStationArray = function (xml) {
		var data = _xmlToJson(xml),
		    shakemapData = data['shakemap-data'][1],
		    stations = this._stations = shakemapData.stationlist.station;

		// sort by distance
		stations.sort(_sortByDistance);

		return stations;
	};

	/**
	 * Generate summary markup for station list.
	 *
	 * @param  {array} data,
	 *         list of station objects.
	 *
	 * @return {string}
	 *         HTML markup.
	 */
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
				'<div class="station-toggle" data-id="', i ,'">',
					'<h3>', title, '</h3>',
					'<ul class="station-summary">',
						'<li class="mmi mmi', romanNumeral, '">',
							'<span>', station.intensity, '</span>',
							'<abbr title="Modified Mercalli Intensity">mmi</abbr>',
						'</li>',
						'<li>',
							'<span>', vel ,'</span>',
							'<abbr title="Maximum Horizontal Peak Ground Velocity">',
								'pgv',
							'</abbr>',
						'</li>',
						'<li>',
							'<span>', acc ,'</span>',
							'<abbr title="Maximum Horizontal Peak Ground Acceleration">',
								'pga',
							'</abbr>',
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

	/**
	 * Generate details markup for station details. This is only called
	 * when a station details section is expanded.
	 *
	 * @param  {string} index,
	 *         a data-id value that identifies the station details
	 *         section that was expanded on a click event.
	 *
	 * @return {string}
	 *         HTML markup.
	 */
	ShakemapDetailsPage.prototype._buildStationDetails = function (index) {
		var station,
		    components;

		// check for null index id
		if (!index) {
			return;
		}

		station = this._stations[index];
		components = station.comp;

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

	/**
	 * Called by _buildStationDetails, this finishes generating
	 * markup for the station details section.
	 *
	 * @param  {array} components,
	 *         station components for the station list.
	 *
	 * @return {string}
	 *         HTML markup
	 */
	ShakemapDetailsPage.prototype._buildComponentDetails = function (components) {
		var componentsMarkup = [],
		    component;

		// check for null
		if (!components) {
			return;
		}

		// When one record exists components is an object not an array
		if(typeof components === 'object' && !(components instanceof Array)) {
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
			'<table class="responsive station-components">',
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

	/**
	 * Used to generate markup for component details based on the flag value.
	 *
	 * @param  {object} data,
	 *         component value and component flag
	 *         {
	 *           value: 0.123,
	 *           flag: 'G'
	 *         }
	 *
	 * @return {string}
	 *         HTML markup
	 */
	ShakemapDetailsPage.prototype._buildTableCell = function (data) {
		var td = [],
		    flag,
		    value;

		if (data) {
			flag = data.flag;
			value = data.value;

			// Add flag class for all non-zero flags
			if (flag && flag !== '0') {
				td.push('<td class="flag">');
				td.push(parseFloat(value, 10).toFixed(3));

				// display flag with title text
				if (FLAG_DESCRIPTIONS.hasOwnProperty(flag)) {
					td.push(' <abbr title="' + FLAG_DESCRIPTIONS[flag] + '">(' +
							flag + ')</abbr>');
				} else {
					td.push(' (' + flag + ')');
				}
				td.push('</td>');
			} else {
				td.push('<td>');
				td.push(parseFloat(value, 10).toFixed(3));
				td.push('</td>');
			}
		} else {
			td.push('<td>--</td>');
		}

		return td.join('');
	};


	/**
	 * Event delagator for station list section,
	 * handles expanding and collapsing station details.
	 *
	 * @param  {object} e,
	 *         click event.
	 *
	 */
	ShakemapDetailsPage.prototype._toggleDetails = function (e) {
		var target = e.target,
		    container = e.target.parentNode,
		    className,
		    details,
		    detailSection,
		    newSection;

		if (target.nodeName === 'A' && target.classList.contains('expand')) {
			// after creating the section, toggle the details on click
			detailSection = container.querySelector('.station-details');
			if (detailSection) {
				target.classList.toggle('open');
				detailSection.classList.toggle('details-hidden');
				return;
			}

			className = 'station-details details-' + target.getAttribute('data-id');
			details = this._buildStationDetails(target.getAttribute('data-id'));
			newSection = document.createElement('div');
			newSection.className = className;
			newSection.innerHTML = details;

			target.classList.toggle('open');
			container.appendChild(newSection);
		}
	};

	/**
	 * Find the max value in an array, used to determine max
	 * values for station summary section.
	 *
	 * @param  {array} array,
	 *         array of objects to parse through for max value.
	 *
	 * @param  {string} key,
	 *         name of attribute to evaluate.
	 *
	 * @return {string}
	 *         max value.
	 */
	ShakemapDetailsPage.prototype._findMaxValue = function (array, key) {
		var values = [],
		    item;

		// Only one value, return value as max
		if (!array.length && array[key]) {
			return parseFloat(array[key].value, 10);
		}

		for (var i = 0; i < array.length; i++) {

			if (array[i].hasOwnProperty(key)) {
				item = array[i][key].value;
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

	/**
	 * Generate downloads markup for event module footer
	 */
	ShakemapDetailsPage.prototype._setFooterMarkup = function () {

		var el = this._footer;

		el.className = 'downloads';
		el.innerHTML = 'Loading contents ...';

		new ContentsXML({
				product: this._shakemap,
				callback: function (contents) {
					el.innerHTML = '<header><h3>Downloads</h3></header>' +
							contents.getDownloads();
				},
				errback: function () {
					el.innerHTML = 'Error loading contents ...';
				}});
		//return el;
	};

	// return constructor
	return ShakemapDetailsPage;
});