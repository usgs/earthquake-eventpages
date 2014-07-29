/* global define */
define([
	'util/Util',
	'base/EventModule'
], function (
	Util,
	EventModule
) {
	'use strict';

	var DEFAULTS = {
		title: 'General',
		hash: 'general',
		cssUrl: require.toUrl('summary/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'summary/SummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				//Always include page.
				hasContent: function () {
					return true;
				},
				productTypes: ['origin', 'geoserve']
			},
			{
				className: 'summary/InteractiveMap',
				options: {
					title: 'Interactive Map',
					hash: 'map'
				}
			}
		]
	};

	var SummaryModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		if (options.eventConfig && options.eventConfig.KML_STUB) {
			this._kmlUrl = options.eventConfig.KML_STUB.replace('%s',
					options.eventDetails.id);
		}
		EventModule.call(this, Util.extend({}, DEFAULTS, options || {}));

		// Enhance the timestamp in event
		this._updateTimestampHeader();
	};
	SummaryModule.prototype = Object.create(EventModule.prototype);

	SummaryModule.prototype.getNavigationItems = function (hash) {
		var markUp = EventModule.prototype.getNavigationItems.call(this, hash);

		if ( this._kmlUrl ) {
			markUp.push('<a href="' + this._kmlUrl + '">Google Earth KML</a>');
		}

		return markUp;
	};

	SummaryModule.prototype._updateTimestampHeader = function () {
		var stampElement = document.querySelector('.event-header .utc'),
		    properties = this._eventDetails.properties,
		    otherTimes = null,
		    time;

		if (!stampElement) { return; }

		otherTimes = stampElement.parentNode.insertBefore(
				document.createElement('div'), stampElement);

		Util.addClass(stampElement, 'link');
		Util.addClass(otherTimes, 'popup');

		Util.addEvent(stampElement, 'click', function () {
			if (Util.hasClass(otherTimes, 'visible')) {
				Util.removeClass(otherTimes, 'visible');
			} else {
				Util.addClass(otherTimes, 'visible');
			}
		});
		time = parseInt(properties.time, 10);

		otherTimes.innerHTML =
				this._formatDate(time, -1 * (new Date()).getTimezoneOffset()) +
				' <abbr title="Timezone your computer is configured to use">' +
					'local system time' +
				'</abbr>' +
				'<br/>' +
				'<a href="' +
				this._formatWorldClock(time) +
				'" target="_blank">' +
					'Times in other timezones' +
				'</a>';
	};


	// TODO :: Move these date formatting methods to a utility class for re-use.

	SummaryModule.prototype._formatDate = function (stamp, minutesOffset) {
		var milliOffset = minutesOffset * 60 * 1000,
		    offsetString = this._formatTimezoneOffset(minutesOffset),
		    theDate = new Date(stamp + milliOffset),
		    year = theDate.getUTCFullYear(),
		    month = theDate.getUTCMonth() + 1,
		    day = theDate.getUTCDate(),
		    hours = theDate.getUTCHours(),
		    minutes = theDate.getUTCMinutes(),
		    seconds = theDate.getUTCSeconds();

		if (month < 10) {month = '0' + month;}
		if (day < 10) {day = '0' + day;}
		if (hours < 10) {hours = '0' + hours;}
		if (minutes < 10) {minutes = '0' + minutes;}
		if (seconds < 10) {seconds = '0' + seconds;}

		return year + '-' + month + '-' + day + ' ' + hours + ':' +
				minutes + ':' + seconds + ' (UTC' + offsetString + ')';
	};

	SummaryModule.prototype._formatWorldClock = function (stamp) {
		var theDate = new Date(stamp),
		    uri,
		    title = this._eventDetails.properties.title;

		uri = 'http://www.timeanddate.com/worldclock/fixedtime.html?iso=' +
				theDate.toISOString() + '&msg=' + title;
		uri = encodeURI(uri);

		return uri;
	};

	SummaryModule.prototype._formatTimezoneOffset = function (offset) {
		var buffer = [],
		    hours = null,
		    minutes = null;

		if (offset < 0) {
			buffer.push('-');
			offset *= -1;
		} else {
			buffer.push('+');
		}

		hours = parseInt(offset / 60, 10);
		if (hours < 10) {
			buffer.push('0');
		}
		buffer.push(hours + ':');

		minutes = parseInt(offset % 60, 10);
		if (minutes < 10) {
			buffer.push('0');
		}
		buffer.push(minutes);

		return buffer.join('');
	};

	return SummaryModule;
});
