/* global define, describe, it, beforeEach, afterEach */
define([
  'chai',
  'sinon',
  'util/Xhr',
  'summary/InteractiveMap',
  'summary/ContoursLayer',
  'summary/ShakeMapStationLayer'
], function (
  chai,
  sinon,
  Xhr,
  InteractiveMap,
  ContoursLayer,
  ShakeMapStationLayer
) {

  'use strict';

  var expect = chai.expect;

  describe('InteractiveMap test suite.', function () {

    describe('Contours Layer', function () {

      it('Can be defined', function () {
        /* jshint -W030 */
        expect(ContoursLayer).to.not.be.undefined;
        /* jshint +W030 */
      });
    });

    describe('Station Layer', function () {
      it('Can be defined', function () {
        /* jshint -W030 */
        expect(ShakeMapStationLayer).to.not.be.undefined;
        /* jshint +W030 */
      });
    });

    describe('Interactive Map', function () {
      var interactiveMap,
          ajax,
          eventDetails;

      beforeEach(function () {
        ajax = sinon.stub(Xhr, 'ajax', function (options) {
          options.success({
            features: [],
            type: 'FeatureCollection'
          });
        });

        eventDetails = {
          geometry: {
            coordinates: [1,2,3]
          },
          properties: {
            products: {
              shakemap: [{
                contents: {
                  'download/cont_mi.json': {
                    url: 'json'
                  },
                  'download/stationlist.json': {
                    url: 'json'
                  }
                }
              }]
            }
          }
        };
      });

      afterEach(function () {
        ajax.restore();
      });

      it('Has Station and Contours Layer', function () {
        interactiveMap = new InteractiveMap({
          eventDetails: eventDetails
        });
        expect(interactiveMap._contourLayer).to.be.an.instanceOf(ContoursLayer);
        expect(interactiveMap._stationLayer).to.be.an.instanceOf(
            ShakeMapStationLayer);
      });

      it('Has Station but not Contours Layer', function () {
        delete eventDetails.properties.products.shakemap[0].
            contents['download/cont_mi.json'];
        interactiveMap = new InteractiveMap({
          eventDetails: eventDetails
        });

        /* jshint -W030 */
        expect(interactiveMap._contourLayer).to.be.undefined;
        /* jshint +W030 */

        expect(interactiveMap._stationLayer).to.be.an.instanceOf(
            ShakeMapStationLayer);
      });

      it('Has Contours Layer but not Station Layer', function () {
        delete eventDetails.properties.products.shakemap[0].
            contents['download/stationlist.json'];
        interactiveMap = new InteractiveMap({
          eventDetails: eventDetails
        });

        /* jshint -W030 */
        expect(interactiveMap._stationLayer).to.be.undefined;
        /* jshint +W030 */

        expect(interactiveMap._contourLayer).to.be.an.instanceOf(
            ContoursLayer);
      });

      it('Has neither Contours Layer or Station Layer', function () {
        delete eventDetails.properties.products.shakemap[0].
            contents['download/cont_mi.json'];
        delete eventDetails.properties.products.shakemap[0].
            contents['download/stationlist.json'];
        interactiveMap = new InteractiveMap({
          eventDetails: eventDetails
        });
        /* jshint -W030 */
        expect(interactiveMap._stationLayer).to.be.undefined;
        expect(interactiveMap._contourLayer).to.be.undefined;
        /* jshint +W030 */
      });

    });
  });
});