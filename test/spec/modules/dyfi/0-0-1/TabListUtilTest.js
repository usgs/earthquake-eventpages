/* global define, describe, it */
define([
	'chai',

	'dyfi/TabListUtil',
	'dyfi/DYFIModule'
], function (
	chai,

	TabListUtil,
	DYFIModule
) {
	'use strict';

	var expect = chai.expect,
	    contents,
	    dataObject,
	    tablist;

	describe('TabListUtil test', function () {
		describe('Constructor', function () {
			it('can be defined', function () {
				/* jshint -W030 */
				expect(TabListUtil).not.to.be.undefined;
				/* jshint +W030 */
			});
		});

		describe('CreeateTabListData()', function () {
			var contents = null,
			    eventId = null,
			    dataObject = null;

			it('Undefinded if contents, eventId, or dataObject are null',
					function () {
				expect(tablist).to.be.undefined;
			});

			it('', function () {
				var contents,
				    eventId,
				    dataObject;

				expect(tablist).to.equal();
			});
		});

	});
});