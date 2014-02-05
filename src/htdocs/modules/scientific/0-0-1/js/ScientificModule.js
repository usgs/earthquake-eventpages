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
		dependencyLoader: 'scientific/ScientificModuleDependencies',
		pages: [
			{
				className: 'scientific/ScientificSummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				productTypes: [
					'origin',
					'phase-data',
					'moment-tensor',
					'focal-mechanism',
					'finite-fault'
				]
			},
			{
				className: 'scientific/HypocenterSummaryPage',
				options: {
					title: 'Hypocenter',
					hash: 'hypocenter'
				},
				productTypes: [
					'origin',
					'phase-data'
				]
			},
			{
				className: 'scientific/MomentTensorSummaryPage',
				options: {
					title: 'Moment Tensor',
					hash: 'tensor'
				},
				productTypes: ['moment-tensor']
			},
			{
				className: 'scientific/FocalMechanismSummaryPage',
				options: {
					title: 'Focal Mechanism',
					hash: 'mechanism'
				},
				productTypes: ['focal-mechanism']
			},
			{
				className: 'scientific/FiniteFaultPage',
				options: {
					title: 'Finite Fault',
					hash: 'finitefault'
				},
				productTypes: ['finite-fault']
			}
		]
	};

	var ScientificModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._event = options.event;
		EventModule.call(this, options);
	};
	ScientificModule.prototype = Object.create(EventModule.prototype);



/*
 * Used by ScientificModule.getPageInfo
 * 
 * Generate dynamic page info object for hypocenter details page
 */
	ScientificModule.prototype._getHypocenterPageInfo = function (code) {

		var products = this._eventDetails.properties.products.origin;

		if (products === undefined) {
			return null;
		}

		// load summary page
		if (code === 'scientific_hypocenter') {

			if (products.length === 1 ) {
				// load details page
				code = products[0].source + '_' + products[0].code;
			} else {
				return {
					className: 'scientific/HypocenterSummaryPage',
					options: {
						title: 'Hypocenter',
						hash: 'hypocenter'
					}
				};
			}
		}

		return {
				'className': 'scientific/HypocenterDetailsPage',
				'options': {
					'title': 'Hypocenter',
					'hash': 'hypocenter_' + code,
					'code': code
				}
			};
	};

/*
 * Used by ScientificModule.getPageInfo
 * 
 * Generate dynamic page info object for moment tensor details page
 */
	ScientificModule.prototype._getTensorPageInfo = function (code) {

		var products = this._eventDetails.properties.products['moment-tensor'];

		if (products === undefined) {
			return null;
		}

		// load summary page
		if (code === 'scientific_tensor') {

			if (products.length === 1 ) {
				// load details page
				code = products[0].source + '_' + products[0].code;
			} else {
				return {
					className: 'scientific/MomentTensorSummaryPage',
					options: {
						title: 'Moment Tensor',
						hash: 'tensor'
					}
				};
			}
		}

		return {
				'className': 'scientific/MomentTensorDetailsPage',
				'options': {
					'title': 'Moment Tensor',
					'hash': 'tensor_' + code,
					'code': code
				}
			};
	};

/*
 * Used by ScientificModule.getPageInfo
 * 
 * Generate dynamic page info object for focal mechanism details page
 */
	ScientificModule.prototype._getMechanismPageInfo = function (code) {

		var products = this._eventDetails.properties.products['focal-mechanism'];

		if (products === undefined) {
			return null;
		}

		// load summary page
		if (code === 'scientific_mechanism') {

			if (products.length === 1 ) {
				// load details page
				code = products[0].source + '_' + products[0].code;
			} else {
				return {
					className: 'scientific/FocalMechanismSummaryPage',
					options: {
						title: 'Focal Mechanism',
						hash: 'mechanism'
					}
				};
			}
		}

		return {
				'className': 'scientific/FocalMechanismDetailsPage',
				'options': {
					'title': 'Focal Mechanism',
					'hash': 'mechanism_' + code,
					'code': code
				}
			};
	};

/**
 * Handles requests for details pages.  Parses out the source/code combination.
 * 
 * @param  {string} pageHash,
 *                  the requested hash
 * @return {object} pageInfo,
 *                  an object that defines which page to load
 */
	ScientificModule.prototype._getPageInfo = function (pageHash) {
		var numPages = this._pages.length,
		    i = null, pageInfo = null, page, hash, code;

		hash = pageHash.split('_');

		// strip product code from hash
		page = hash[1];
		code = pageHash.replace(this._hash + '_' + page + '_', '');

		if (page === 'tensor') {
			return this._getTensorPageInfo(code);
		} else if (page === 'hypocenter') {
			return this._getHypocenterPageInfo(code);
		} else if (page === 'mechanism') {
			return this._getMechanismPageInfo(code);
		} else {
			pageHash = pageHash.replace(this._hash + '_', '');
			for (i = 0; i < numPages; i++) {
				pageInfo = this._pages[i];
				if (pageInfo.options.hash === pageHash) {
					return pageInfo;
				}
			}
		}

		return null;
	};


	/**
	 * Override EventModule.getPage to generate dynamic pageInfo object
	 * for Moment tensor details page.
	 * 
	 */
	ScientificModule.prototype.getPage = function (hash, callback) {
		var module = this,
		    pageInfo;

		pageInfo = this._getPageInfo(hash);

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
