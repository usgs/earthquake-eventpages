/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'util/Xhr'
], function (
	Util,
	EventModulePage,
	Xhr
) {
	'use strict';

	var DEFAULTS = {
		title: 'Responses',
		hash: 'responses'
	};

	var DYFIResponsesPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	DYFIResponsesPage.prototype = Object.create(EventModulePage.prototype);

	DYFIResponsesPage.prototype._setContentMarkup = function() {
		var products = this._event.properties.products;

		if (!products.dyfi || !products.dyfi[0].contents.hasOwnProperty('cdi_zip.xml')) {
			return;
		}

		this._getDYFIResponses(products.dyfi[0].contents['cdi_zip.xml']);
	};


	DYFIResponsesPage.prototype._getDYFIResponses = function(file) {
		var _this = this;
		Xhr.ajax({
			url: file.url,
			success: function (data, xhr) {
				_this._buildResponsesTable(_this._buildResponsesArray(xhr.responseXML));
			},
			error: function () {
				var output = document.createElement('p');
				output.className = 'error';
				output.innerHTML = 'Error: Unable to retreive DYFI responses.';
				_this._content.appendChild(output);
			}
		});
	};

	DYFIResponsesPage.prototype._buildResponsesArray = function (xmlDoc) {

		var locations = xmlDoc.getElementsByTagName('location'),
				responsesArray = [];

		for (var x=0;x<locations.length;x++) {

			var locationName = locations[x].getAttribute('name');
			var location = locations[x].childNodes,
					name = '',
					state = '',
					cdi = '',
					nresp = '',
					dist = '',
					country = '',
					zip = '';

			for (var i=0;i<location.length;i++) {

				if (location[i].nodeName === 'name') {
					name =location[i].childNodes[0].nodeValue;
				}
				
				if (location[i].nodeName === 'state') {
					state =location[i].childNodes[0].nodeValue;
				}

				if (location[i].nodeName === 'cdi') {
					cdi =location[i].childNodes[0].nodeValue;
				}

				if (location[i].nodeName === 'nresp') {
					nresp =location[i].childNodes[0].nodeValue;
				}

				if (location[i].nodeName === 'dist') {
					dist =location[i].childNodes[0].nodeValue;
				}
			}

			// determine country/ add zip code to name
			if (locationName.length === 5) {
				name = name;
				country = 'United States of America';
				zip = locationName;
			} else {
				state = locationName.split('::')[1];
				country = locationName.split('::')[2];
			}

			var record = {
				'name': name,
				'state': state,
				'country': country,
				'cdi': parseInt(cdi, 10),
				'nresp': parseInt(nresp, 10),
				'dist': parseInt(dist, 10),
				'zip': zip
			};

			responsesArray.push(record);

		}

		return responsesArray;
	};

	DYFIResponsesPage.prototype._buildResponsesTable = function (records) {

		if (records.length !== 0) {

			records.sort(this._sortByDistance);

			var tableMarkup = [
				'<thead>',
					'<tr>',
						'<th>Location</th>',
						'<th title="Modified Mercalli Intensity">MMI</th>',
						'<th title="Number of responses">Responses</th>',
						'<th title="Distance from epicenter">Distance</th>',
					'</tr>',
				'</thead>',
				'<tbody>'
			];

			var responsesTable = document.createElement('table');
			var expandListLink = document.createElement('span');
			expandListLink.setAttribute('role', 'button');
			expandListLink.innerHTML = 'See All Responses';
			expandListLink.id = 'showResponses';
			expandListLink.className = 'button';


			for (var i=0;i<records.length;i++) {

				var record = records[i];

				if (i >= 10) {
					tableMarkup.push('<tr class="hidden">');
				} else {
					tableMarkup.push('<tr>');
				}

				var romanNumeral = this._translateMmi(record.cdi);

				tableMarkup.push(
					'<td>',
						record.name, ', ' ,record.state, ' ', record.zip,
						'<small>', record.country,'</small>',
					'</td>',
					'<td class="mmi"><span class="mmi' + romanNumeral + '">' + romanNumeral + '</span></td>',
					'<td>',record.nresp,'</td>',
					'<td>',record.dist,'</td>'
				);

				tableMarkup.push('</tr>');
			}

			tableMarkup.push(
					'</tbody>'
			);

			responsesTable.innerHTML = tableMarkup.join('');
			this._content.appendChild(responsesTable);

			if (records.length > 10) {
				this._content.appendChild(expandListLink);
			}

			this._bindEvent(expandListLink, responsesTable);

		} else {
			// There are no records
			var div = document.createElement('div');
			div.className = 'info';
			div.innerHTML = 'No data available.';
			this._content.appendChild(div);
		}
	};

	DYFIResponsesPage.prototype._bindEvent = function (linkDom, table) {
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

	DYFIResponsesPage.prototype._sortByDistance = function (a, b) {
		if (a.dist < b.dist) {
			return -1;
		}
		if (a.dist > b.dist) {
			return 1;
		}
			return 0;
	};

	DYFIResponsesPage.prototype._translateMmi = function (mmi) {

		var romanNumeral = '';
		mmi = parseInt(mmi, 10);

		switch (mmi) {
			case 1:
				romanNumeral = 'I';
				break;
			case 2:
				romanNumeral = 'II';
				break;
			case 3:
				romanNumeral = 'III';
				break;
			case 4:
				romanNumeral = 'IV';
				break;
			case 5:
				romanNumeral = 'V';
				break;
			case 6:
				romanNumeral = 'VI';
				break;
			case 7:
				romanNumeral = 'VII';
				break;
			case 8:
				romanNumeral = 'VIII';
				break;
			case 9:
				romanNumeral = 'IX';
				break;
			case 10:
				romanNumeral = 'X';
				break;
			case 11:
				romanNumeral = 'XI';
				break;
			case 12:
				romanNumeral = 'XII';
				break;
		}
		return romanNumeral;
	};

	return DYFIResponsesPage;
});
