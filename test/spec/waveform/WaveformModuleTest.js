/* global before, chai, describe, it, sinon */
'use strict';

var WaveformModule = require('waveform/WaveformModule'),
    Xhr = require('util/Xhr');


var expect = chai.expect;

describe('waveform/WaveformModule', function () {
  var data,
      xhr;

  before(function (done) {
    Xhr.ajax({
      url: 'http://service.iris.edu/fdsnws/event/1/query?starttime=2016-03-02T12%3A49%3A32.360&endtime=2016-03-02T12%3A50%3A04.360&latitude=-4.9082&longitude=94.275&maxradius=1&format=text',
      success: function (r, x) {
        data = r;
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof WaveformModule).to.equal('function');
    });
  });

  describe('fetchData', function () {
    it('calls onError when no data is found', function () {
      var view;

      view = WaveformModule();
      sinon.stub(view, 'onError', function () {});
      sinon.stub(Xhr, 'ajax', function (options) {
        options.error();
      });
      view.fetchData();
      expect(view.onError.callCount).to.equal(1);

      view.onError.restore();
      Xhr.ajax.restore();
      view.destroy();
    });

    it('calls onSuccess when data is found', function () {
      var view;

      view = WaveformModule();
      sinon.stub(view, 'onSuccess', function () {});
      sinon.stub(Xhr, 'ajax', function (options) {
        options.success();
      });
      view.fetchData();
      expect(view.onSuccess.callCount).to.equal(1);

      view.onSuccess.restore();
      Xhr.ajax.restore();
      view.destroy();
    });
  });

  describe('onError', function () {
    it('should use default error message', function () {
      var view;

      view = WaveformModule();

      view.onError();
      expect(view.el.innerHTML).to.equal
          ('<p class="alert error">Error finding waveform data</p>');

      view.destroy();
    });
  });

  describe('onSuccess', function () {
    it('does not have an event id', function () {
      var spy,
          stub,
          view;

      view = WaveformModule();

      stub = sinon.stub(view, 'parseIrisEventId', function () {
        return false;
      });

      spy = sinon.spy(view, 'onError');

      view.onSuccess();

      expect(spy.callCount).to.equal(1);

      spy.restore();
      stub.restore();
      view.destroy();
    });

    it('does have an event id', function () {
      var spy,
          stub,
          view;

      view = WaveformModule();

      stub = sinon.stub(view, 'parseIrisEventId', function () {
        return true;
      });

      spy = sinon.spy(view, 'renderContent');

      view.onSuccess();

      expect(spy.callCount).to.equal(1);

      spy.restore();
      stub.restore();
      view.destroy();
    });
  });

  describe('parseIrisEventId', function () {
    it('parses data correctly', function () {
      var data,
          view;

      data = '#EventID | Time | Latitude | Longitude | Depth/km | Author |' +
          ' Catalog | Contributor | ContributorID | MagType | Magnitude | ' +
          'MagAuthor | EventLocationName\n5176028|2016-03-02T12:49:48|-4.9082| ' +
          '94.275|24.0|US|NEIC PDE|NEIC COMCAT|product.xml|MWW|7.8|US|' +
          'SOUTHWEST OF SUMATERA, INDONESIA';

      view = WaveformModule();

      expect(view.parseIrisEventId(data)).to.equal('5176028');
      view.destroy();
    });
  });

  describe('renderContent', function () {
    it('renders content', function () {
      var spy,
          stub,
          view,
          eventId;

      view = WaveformModule();
      eventId = '5176028';

      stub = sinon.stub(view, 'onSuccess', function () {
        return eventId;
      });

      spy = sinon.spy(view, 'renderContent');
      view.renderContent();

      expect(spy.callCount).to.equal(1);
      spy.restore();
      stub.restore();
      view.destroy();
    });
  });
});
