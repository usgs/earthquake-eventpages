/* global define, describe, it */
define([
	'chai',
	'sinon',
	'./usb000kqnc',

	'scientific/HypocenterPage'
], function (
	chai,
	sinon,
	eventDetails,

	HypocenterPage
) {
	'use strict';
	var expect = chai.expect;

	describe('HypocenterPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(HypocenterPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new HypocenterPage({eventDetails: eventDetails});
				expect(c).to.be.an.instanceof(HypocenterPage);
			});
		});

		describe('getOriginDetail()', function () {

			it('Executes callback', function (done) {
				var hp = new HypocenterPage({eventDetails: eventDetails}),
				    product = hp.getProducts()[0];

				hp.getOriginDetail(product, function () {
					/* jshint -W030 */
					expect(true).to.be.true;
					/* jshint +W030 */
					done();
				});
			});

		});

	});
});
