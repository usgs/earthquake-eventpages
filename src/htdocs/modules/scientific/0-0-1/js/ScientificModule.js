/* global define */
define([
	'util/Util',
	'base/EventModule',
	'require'
], function (
	Util,
	EventModule,
	require
) {
	'use strict';

	var DEFAULTS = {
		title: 'Scientific',
		hash: 'scientific',
		cssUrl: require.toUrl('scientific/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'scientific/ScientificSummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				}
			},
			{
				className: 'scientific/HypocenterPage',
				options: {
					title: 'Hypocenter',
					hash: 'hypocenter'
				}
			},
			{
				className: 'scientific/MomentTensorSummaryPage',
				options: {
					title: 'Moment Tensor',
					hash: 'tensor'
				}
			},
			{
				className: 'scientific/FocalMechanismPage',
				options: {
					title: 'Focal Mechanism',
					hash: 'mechanism'
				}
			},
			{
				className: 'scientific/FiniteFaultPage',
				options: {
					title: 'Finite Fault',
					hash: 'finitefault'
				}
			}
		]
	};

	var ScientificModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});

		EventModule.call(this, options);
	};
	ScientificModule.prototype = Object.create(EventModule.prototype);


	ScientificModule.prototype.getFooterMarkup = function () {
		return '<a href="' +
				'http://earthquake.usgs.gov/earthquakes/eventpage/terms.php' +
				'">Technical Terms used on Event Pages</a>';
	};


	ScientificModule.prototype._getTensorPageInfo = function (source, type) {
		var pageInfo = {
					'className': 'scientific/MomentTensorPage',
						'options': {
							'title': 'Moment Tensor',
							'hash': 'tensor_' + source + '_' + type,
							'source': source,
							'type': type
						}
				};

		return pageInfo;
	};

	/**
	 * @param hash {String}
	 *      The URL fragment for which page to get. This hash will include both
	 *      the module stub as well as the page stub (separated by an underscore).
	 * @param callback {Function}
	 *      A method called upon completion. If the page is found, the callback
	 *      method is passed the class constructor function to instantiate the
	 *      desired page. If the page is not found, the callback method is passed
	 *      a null argument. The callback function should handle this null
	 *      instance.
	 */
	ScientificModule.prototype.getPage = function (hash, callback) {
		var module = this,
		    pageInfo;
		var hashArray = hash.split('_');

		if (hashArray.length === 4 && hashArray[1] === 'tensor') {
			pageInfo = this._getTensorPageInfo(hashArray[2], hashArray[3]);
		} else {
			pageInfo = this._getPageInfo(hash.replace(this._hash + '_', ''));
		}

		var pageOptions = Util.extend({}, pageInfo.options,
				{eventDetails: this._eventDetails, module: module});
		var classLoader = null;

		if (this._dependencyLoader !== null) {
			// Use configured dependency loader to load all pages at once
			classLoader = this._dependencyLoader;
		} else {
			// No dependency loader, load classes individually based on class name
			classLoader = pageInfo.className;
		}

		require([classLoader], function (PageConstructor) {
			var page = null;

			//try {
				if (typeof PageConstructor === 'function') {
					page = new PageConstructor(pageOptions);
				} else {
					page = new PageConstructor[pageInfo.className](pageOptions);
				}

				if (!module._cssLoaded) {
					module._loadCSS();
				}
			//} catch (e) {
				// TODO :: Hmm... ?
			//}

			callback(page);
		});
	};

	return ScientificModule;
});
