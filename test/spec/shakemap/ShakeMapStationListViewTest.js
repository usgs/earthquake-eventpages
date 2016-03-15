/* global before, chai, describe, it */
'use strict';

var ShakeMapStationListView = require('shakemap/ShakeMapStationListView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('shakemap/ShakeMapStationListView', function () {
  var responseText,
      xhr;

  before(function (done) {
    var stationListUrl = '/products/shakemap/us10004u1y/us/1456937483212/' +
        'download/stationlist.json';
    Xhr.ajax({
      url: stationListUrl,
      success: function (r, x) {
        responseText = r;
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be define', function () {
      expect(typeof ShakeMapStationListView).to.equal('function');
    });

    it('can be constructed', function (){
      /* jshint -W030 */
      expect(ShakeMapStationListView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onError', function () {
    var view;

    before(function () {
      view = ShakeMapStationListView();
    });

    it('should use static message', function () {
      expect(view.el.innerHTML).to.not.equal(
          ShakeMapStationListView.NO_CONTENT_MESSAGE);

      view.onError('Custom Message');

      expect(view.el.innerHTML).to.equal(
          ShakeMapStationListView.NO_CONTENT_MESSAGE);
    });
  });

  describe('onSuccess', function () {
    var view;

    before(function () {
      view = ShakeMapStationListView();
    });

    it('should create a list', function () {
      /* jshint -W030 */
      expect(view.el.querySelectorAll('.shakemap-stations > .station').length).
          to.equal(0);
      /* jshint +W030 */

      view.onSuccess(responseText, xhr);

      /* jshint -W030 */
      expect(view.el.querySelectorAll('.shakemap-stations > .station').length).
          to.not.equal(0);
      /* jshint +W030 */
    });
  });

  describe('formatComponent', function () {
    it('should format an amplitude', function () {
      var amplitudes,
          amplitude,
          component,
          view = ShakeMapStationListView();

      amplitudes = responseText.features[0].properties.channels[0].amplitudes;
      amplitude = view.createAmplitudesObject(amplitudes);
      component = view.formatComponent(amplitude.pga);

      expect(component).to.contain('2.905');
    });
  });

  describe('createAmplitudesObject', function () {
    it('should create an Amplitude Object', function() {
      var amplitudes,
         amplitude,
         view = ShakeMapStationListView();

      amplitudes = responseText.features[0].properties.channels[0].amplitudes;
      amplitude = view.createAmplitudesObject(amplitudes);

      expect(amplitude.pga.value).to.equal(2.9049);
    });
  });

  describe('createChannelRow', function () {
    it('should return a Channel Row', function() {
      var channel,
         channelRow,
         view = ShakeMapStationListView();

      channel = responseText.features[0].properties.channels[0];
      channelRow = view.createChannelRow(channel);

      expect(channelRow).to.contain(
          '<th scope="row" class="station-channel-name">--.HNZ</th>');
    });
  });

  describe('createChannelTable', function () {
    it('should return a channel table string', function() {
      var channels,
         channelTable,
         view = ShakeMapStationListView();

      channels = responseText.features[0].properties.channels;
      channelTable = view.createChannelTable(channels);

      expect(channelTable).to.contain(
          '<th scope="col" class="station-channels-list-name">name</th>');
    });
  });

  describe('formatLocation', function () {
    it('should return a formatted location string', function() {
      var feature,
          location,
          view = ShakeMapStationListView();

      feature = responseText.features[0];
      location = view.formatLocation(feature);

      expect(location).to.contain(
        '(35.4292, -119.0559)');
    });
  });

  describe('buildStationsDetails', function () {
    it('should return a station details string', function () {
      var details,
          station,
          view = ShakeMapStationListView();

      station = responseText.features[0];
      details = view.buildStationDetails(station);

      expect(details).to.contain(
          'California Strong Motion Instrumentation Program');
    });
  });

  describe('buildStationList', function () {
    it('should return a stations list string', function () {
      var result,
          view = ShakeMapStationListView();

      result = view.buildStationList(responseText);

      expect(result).to.contain('<small>Calstate Bakersfield</small>');
    });
  });
});
