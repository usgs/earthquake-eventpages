/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'util/Xhr',
	'./usb000kqnc',

	'scientific/HypocenterPage'
], function (
	chai,
	sinon,

	Xhr,
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

		describe('getFeString', function () {
			var hp = null,
			    product = null,
			    ajaxStub = null;

			beforeEach(function () {
				hp = new HypocenterPage({eventDetails: eventDetails});

				product = hp.getProducts()[0];

				ajaxStub = sinon.stub(Xhr, 'ajax', function (o) {
					if (o.success) {
						o.success({fe: {longName: 'Foo', number: '1'}});
					}
				});
			});

			afterEach(function () {
				ajaxStub.restore();
				ajaxStub = null;

				product = null;

				if (hp.destroy) {
					hp.destroy();
				}
				hp = null;
			});

			it('Executes callback', function (done) {
				hp.getFeString(product, function () {
					/* jshint -W030 */
					expect(true).to.be.true;
					/* jshint +W030 */
					done();
				});

				ajaxStub.restore();
			});

			it('Properly formats string info', function (done) {
				hp.getFeString(product, function (feString) {
					expect(feString).to.equal('Foo (1)');
					done();
				});
			});

			it('Uses default string on error', function (done) {
				hp.getFeString(null, function (feString) {
					expect(feString).to.equal('-');
					done();
				});
			});

		});

	});
});
