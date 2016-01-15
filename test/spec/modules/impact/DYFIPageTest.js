/* global chai, sinon, describe, it, beforeEach, afterEach */
'use strict';

var expect = chai.expect,
    DYFIPage = require('impact/DYFIPage'),
    ImpactModule = require('impact/ImpactModule'),
    IntensityGraphView = require('impact/IntensityGraphView'),
    Xhr = require('util/Xhr'),

    cdi_zip = require('./cdi_zip'),
    dyfi_plot_atten = require('./dyfi_plot_atten'),
    nc72119970 = require('./nc72119970'),
    Usb000ldeh = require('./usb000ldeh');


var eventDetails = Usb000ldeh;
var impactModule = new ImpactModule({eventDetails: eventDetails});
var module_info = {hash:'maps', title:'Maps',
    eventDetails:eventDetails, module:impactModule};

var _fireClickEvent = function (target) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
  target.dispatchEvent(clickEvent);
};


describe('DYFIPage test suite.', function () {
  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(DYFIPage).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {

      var c = new DYFIPage(module_info);
      expect(c).to.be.an.instanceof(DYFIPage);
    });
  });

  describe('_setContentMarkup', function () {
    it('has such a method', function() {
      /* jshint -W030 */
      expect((new DYFIPage(module_info))._setContentMarkup).
          to.not.be.undefined;
      /* jshint +W030 */
    });
  });

  // testing inheritance from EventModulePage
  describe('_initialize', function () {
    it('has such a method', function() {
      /* jshint -W030 */
      expect((new DYFIPage(module_info))._initialize).to.not.be.undefined;
      /* jshint +W030 */
    });
  });

  // just testing inheritance from EventModule.js
  describe('destroy()', function () {
    it('has such a method', function () {
      /* jshint -W030 */
      expect((new DYFIPage(module_info)).destroy).to.not.be.undefined;
      /* jshint +W030 */
    });
  });


  describe('getContent', function () {

    var expect = chai.expect,
        stub, content, tbody, rows, hiddenRows, page,
        impactModule = new ImpactModule({eventDetails: nc72119970}),
        module_info = {hash:'dyfi', title:'Did You Feel It?',
            eventDetails:eventDetails, module:impactModule};

    beforeEach(function () {
      stub = sinon.stub(Xhr, 'ajax', function (options) {
        var xmlDoc;
        if (window.DOMParser) {
          var parser = new DOMParser();
          xmlDoc = parser.parseFromString(cdi_zip.xml,'text/xml');
        }
        options.success(xmlDoc, {responseXML: xmlDoc});
        // content = DYFIPage.prototype._buildResponsesTable(
        //    DYFIPage.prototype._buildResponsesArray(xmlDoc));
      });

      page = new DYFIPage(module_info);
      page._setContentMarkup();

      // Select responses tab
      _fireClickEvent(page._content.querySelector('nav :last-child'));

      content = page._content;
      tbody = content.querySelector('tbody');
      rows  = tbody.querySelectorAll('tr');
    });

    afterEach(function() {
      stub.restore();
    });

    it('can get content.', function () {
      // should equal 104
      expect(rows.length).not.to.equal(0);
    });

    it('has all 104 locations from event "nc72119970" in the DOM',
        function () {
      expect(rows.length).to.equal(104);
    });

    // TODO :: Re-enabled once CORS is configured
    it.skip('shows all 104 locations after the button click', function () {

      var button = content.querySelector('#showResponses');
      _fireClickEvent(button);

      rows  = tbody.querySelectorAll('tr');
      hiddenRows = tbody.querySelectorAll('.hidden');

      expect(rows.length - hiddenRows.length).to.equal(104);
    });

  });

  describe('CreateTabListData()', function () {
    it('has the correct number of tabs', function () {
      var dyfiPage,
          tabs;

      dyfiPage = new DYFIPage(module_info);
      tabs = dyfiPage._tablist.el.querySelectorAll('.tablist-tab');

      expect(tabs.length).to.equal(6);
    });
  });

  describe('IntensityGraphView', function () {
    it('DYFI Plot Attenuation is graphed using D3', function () {
      var container,
          data,
          view;

      container = document.createElement('div');
      data = dyfi_plot_atten;

      view = IntensityGraphView({
          el: container,
          data: data.datasets,
          xlabel: data.xlabel,
          ylabel: data.ylabel,
          title: data.title
        });

      view.render();

      expect(view.views.data().length).to.equal(4);
    });
  });
});
