/* global define, describe, it */
define([
	'chai',

	'dyfi/TabListUtil'
], function (
	chai,

	TabListUtil
) {
	'use strict';

	var expect = chai.expect,
	    tablist = null;

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

			it('not shown if contents, eventId, or dataObject are null',
					function () {
				expect(tablist).to.be.undefined;
			});
		});

	});
});