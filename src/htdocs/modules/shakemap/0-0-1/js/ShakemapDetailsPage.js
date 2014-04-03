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

		shakemap = this._shakemap = products.shakemap[0];
		this._tablist = new TabList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			header: shakemap.code,
			tabs: TabListUtil.CreateTabListData(
				{
					contents: shakemap.contents,
					eventId: shakemap.code,
					dataObject: MAP_IMAGES
				})
		});

		// add station list
		this._addStationList();
	};

	ShakemapDetailsPage.prototype._addStationList = function () {
		var title = 'Station List',
		    _this = this,
		    stationList;

		this._tablist.addTab({
			'title': title,
			'content': function () {
				var container = document.createElement('div');

				_this._getStationData(function (content) {
					var startTime = new Date().getTime();
					container.innerHTML = content;
					var endTime = new Date().getTime();
					console.log('innerHTML completed ' + (endTime - startTime));

					// add click event handling
					//stationList = container.querySelector('table.stations');
					container.addEventListener('click', _this._toggleDetails.bind(_this));

				});

				return container;
			}
		});
	};

	ShakemapDetailsPage.prototype._toggleDetails = function (e) {
		var tr = e.target.parentElement,
		    className,
		    container,
		    details,
		    newRow;

		if (tr.nodeName === 'TR' && tr.classList.contains('toggle')) {
			className = 'details details-' + tr.getAttribute('data-id');
			container = tr.parentNode;
			details = this._buildStationDetails(tr.getAttribute('data-id'));
			newRow = document.createElement('tr');
			newRow.className = className;
			newRow.innerHTML = details;
			// var panel = document.querySelector('.event-module-content');
			// panel.insertBefore(newRow, panel.firstChild);
			if(tr.nextSibling) {
				container.insertBefore(newRow, tr.nextSibling);
			} else {
				container.appendChild(newRow);
			}

			//details.classList.toggle('hidden');
		}

		console.log(details);
	};

	ShakemapDetailsPage.prototype._getStationData = function (callback) {
		var file = this._shakemap.contents[STATION_LIST.suffix],
		    _this = this,
		    content;

		var startTime = new Date().getTime();

		Xhr.ajax({
			url: file.url,
			success: function (data, xhr) {
				var endTime = new Date().getTime();
				console.log('download complete in: ' + (endTime-startTime));
				var stationArray = _this._buildStationArray(xhr.responseXML);

				startTime = new Date().getTime();
				var stationList = _this._buildStationList(stationArray);
				endTime = new Date().getTime();
				console.log('stationList complete in: ' + (endTime-startTime));

				callback(stationList);

			},
			error: function () {
				callback('<p class="shakemap-error">Error: Unable to retreive the station list.</p>');
			}
		});

		return content;
	};

	ShakemapDetailsPage.prototype.xmlToJson = function (xml) {
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
				nodeValue = this.xmlToJson(node);
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

	ShakemapDetailsPage.prototype._buildStationArray = function (xml) {
		var startTime = new Date().getTime(),
		    data = this.xmlToJson(xml),
		    endTime = new Date().getTime(),
		    shakemapData = data['shakemap-data'][1],
		    stations = this._stations = shakemapData.stationlist.station;


				console.log('parse complete in: ' + (endTime-startTime));

		// sort by distance
		startTime = new Date().getTime();
		stations.sort(_sortByDistance);
		endTime = new Date().getTime();
		console.log('sort complete in: ' + (endTime-startTime));

		return stations;
	};

	ShakemapDetailsPage.prototype._buildStationList = function (data) {
		var markup = [],
		    stations = [],
		    station, acc, vel, dist, components;

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


			stations.push([
				'<tr class="toggle" data-id="', i ,'">',
					'<td><abbr title="', station.name ,'">', station.code,'</abbr></td>',
					//'<td>', station.name, '</td>',
					'<td>', dist, ' km</td>',
					'<td>', acc, '</td>', // max acc
					'<td>', vel, '</td>',
					'<td>', station.intensity, '</td>',
				'</tr>'
				// '<tr class="hidden details details-', codeCSS ,'">',
				// 	//'<td colspan="6">',
				// 	'<td colspan="5">',
				// 		this._buildStationDetails(station),
				// 	'</td>',
				// '</tr>'
			].join(''));
		}

		markup = [
			'<table class="responsive stations">',
				'<thead>',
					'<th>Name</th>',
					//'<th>Name</th>',
					'<th>Distance</th>',
					'<th>PGA</th>',
					'<th>PGV</th>',
					'<th>MMI</th>',
				'</thead>',
				'<tbody>',
					stations.join(''),
				'</tbody>',
			'</table>'
		];

		return markup.join('');
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

	ShakemapDetailsPage.prototype._buildStationDetails = function (index) {
		var markup = [],
		    station = this._stations[index],
		    components = station.comp;

		markup.push([
			'<td colspan="5">',
				'<strong>', station.name ,' (', station.code ,')</strong>',
				'<dl>',
					'<dt>Type: </dt>',
					'<dd>', station.insttype ,'</dd>',
					'<dt>Location: </dt>',
					'<dd>(', station.lat, ', ', station.lon ,')</dd>',
					'<dt>Distance: </dt>',
					'<dd>', station.dist ,'</dd>',
					'<dt>Source: </dt>',
					'<dd>', station.source ,'</dd>',
					'<dt>Intensity: </dt>',
					'<dd>', station.intensity ,'</dd>',
				'</dl>',
				this._buildComponentDetails(components),
			'</td>'
		].join(''));

		return markup.join('');
	};

	ShakemapDetailsPage.prototype._buildComponentDetails = function (components) {
		var markup = [],
		    componentsMarkup = [],
		    component;

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

		markup.push([
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
		].join(''));

		return markup.join('');
	};


	ShakemapDetailsPage.prototype._buildTableCell = function (data) {
		var td;

		if (data) {
			if (data.flag !== '0') {
				td = [
					'<td class="flag">',
						parseFloat(data.value, 10).toFixed(3), ' ',
						this._assignFlag(data.flag),
					'</td>'
				].join('');
			} else {
				td = [
					'<td>',
						parseFloat(data.value, 10).toFixed(3),
					'</td>'
				].join('');
			}
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