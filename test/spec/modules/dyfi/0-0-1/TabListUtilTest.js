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
	});
});