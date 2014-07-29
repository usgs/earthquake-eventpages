/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'util/Xhr',
	'./TabListUtil',
	'./ImpactUtil'
], function (
	Util,
	EventModulePage,
	TabList,
	Xhr,
	TabListUtil,
	ImpactUtil
) {
	'use strict';

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

				_this._getDYFIResponses(function (content) {
					// add station list content
					container.innerHTML = '';
					container.appendChild(content);
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
				callback(_this._buildResponsesTable(_this._buildResponsesArray(
						xhr.responseXML)));
			},
			error: function () {
				var output = document.createElement('p');
				output.className = 'dyfi-error';
				output.innerHTML = 'Error: Unable to retreive DYFI responses.';
				_this._content.appendChild(output);
			}
		});
	};

	DYFIPage.prototype._buildResponsesArray = function (xmlDoc) {

		var data = xmlDoc.getElementsByTagName('location'),
		    responsesArray = [];

		for (var x = 0; x < data.length; x++) {

			var locationName = data[x].getAttribute('name'),
			    locations = data[x].childNodes,
			    location = {};

			for (var i = 0; i < locations.length; i++) {

				var node = locations[i],
				    nodeName = node.nodeName,
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

		return responsesArray;
	};

	DYFIPage.prototype._buildResponsesTable = function (records) {
		var responsesDiv;

		if (records.length !== 0) {

			responsesDiv = document.createDocumentFragment();
			records.sort(ImpactUtil._sortByDistance);

			var tableMarkup = [
				'<thead>',
					'<tr>',
						'<th>Location</th>',
						'<th>',
							'<abbr title="Modified Mercalli Intensity">MMI</abbr>',
						'</th>',
						'<th title="Number of responses">Responses</th>',
						'<th title="Distance from epicenter">Distance</th>',
					'</tr>',
				'</thead>',
				'<tbody>'
			];

			var responsesTable = document.createElement('table');
			responsesTable.className = 'responsive dyfi';
			var expandListLink = document.createElement('span');
			expandListLink.setAttribute('role', 'button');
			expandListLink.innerHTML = 'See All Responses';
			expandListLink.id = 'showResponses';
			expandListLink.className = 'button';


			for (var i = 0; i < records.length; i++) {

				var record = records[i];

				if (i >= 10) {
					tableMarkup.push('<tr class="hidden">');
				} else {
					tableMarkup.push('<tr>');
				}

				var romanNumeral = ImpactUtil._translateMmi(record.cdi);

				tableMarkup.push(
						'<th scope="row">',
							record.name, ', ' ,record.state, ' ', record.zip,
							'<small>', record.country,'</small>',
						'</th>',
						'<td class="mmi">',
							'<span class="mmi', romanNumeral, '">', romanNumeral, '</span>',
						'</td>',
						'<td>',record.nresp,'</td>',
						'<td>',record.dist,' km</td>',
					'</tr>'
				);

			}

			tableMarkup.push(
					'</tbody>'
			);

			responsesTable.innerHTML = tableMarkup.join('');
			responsesDiv.appendChild(responsesTable);

			if (records.length > 10) {
				responsesDiv.appendChild(expandListLink);
			}

			this._bindEvent(expandListLink, responsesTable);

		} else {
			// There are no records
			var div = document.createElement('div');
			div.className = 'dyfi-info';
			div.innerHTML = 'No data available.';
			this._content.appendChild(div);
		}

		return responsesDiv;
	};

	DYFIPage.prototype._bindEvent = function (linkDom, table) {

		var allRecords;
		var elementList = table.querySelectorAll('tr.hidden');

		allRecords = function allRecords (linkDom, elementList) {
			//remove button after expanding
			linkDom.parentElement.removeChild(linkDom);

			for (var i = 0; i < elementList.length; i++) {
				// the only class is the "hidden" class
				elementList[i].removeAttribute('class');
			}
		};

		if (linkDom) {
			Util.addEvent(linkDom, 'click', function () {
					allRecords(linkDom, elementList);
			});
		}
	};

	return DYFIPage;
});
