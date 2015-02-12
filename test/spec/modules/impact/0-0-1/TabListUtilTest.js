/* global define, describe, it */
define([
  'chai',
  'sinon',

  'impact/TabListUtil',
  './Usb000ldeh',
  'svgimagemap/SvgImageMap'
], function (
  chai,
  sinon,

  TabListUtil,
  Usb000ldeh,
  SvgImageMap
) {
  'use strict';

  var expect = chai.expect;

  describe('TabListUtil test', function () {
    describe('Constructor', function () {
      it('can be defined', function () {
        /* jshint -W030 */
        expect(TabListUtil).not.to.be.undefined;
        /* jshint +W030 */
      });
    });

    describe('CreeateTabListData()', function () {
      var options = {
        eventId: 'usb000ldeh',
        contents: Usb000ldeh.properties.products.dyfi[0].contents,
        dataObject: [
          {
            title:'Intensity Map',
            suffix:'_ciim.jpg',
            usemap:'imap_base',
            mapSuffix:'_ciim_imap.html'
          },
          {
            title:'Geocoded Map',
            suffix:'_ciim_geo.jpg',
            usemap:'imap_geo',
            mapSuffix:'_ciim_geo_imap.html'
          },
          {
            title:'Zoom Map',
            suffix:'_ciim_zoom.jpg',
            usemap:'imap_zoom',
            mapSuffix:'_ciim_zoom_imap.html'
          },
          {
            title:'Intensity Vs. Distance',
            suffix:'_plot_atten.jpg'
          },
          {
            title:'Responses Vs. Time',
            suffix:'_plot_numresp.jpg'
          }
        ]
      };

      it('not shown if contents, eventId, or dataObject are null',
          function () {
        var tabList = TabListUtil.CreateTabListData();
        expect(tabList.length).to.equal(0);
      });

      it('has the correct number of tabs', function () {
        var tablist = TabListUtil.CreateTabListData(options);

        expect(tablist.length).to.equal(options.dataObject.length);
      });

      it('cretes SVG image maps when needed', function () {
        var spy = sinon.spy(SvgImageMap.prototype, 'initialize');

        TabListUtil.CreateTabListData(options);

        expect(spy.callCount).to.equal(3);
        spy.restore();
      });

      it('Each tablist entry is an instance of a tab', function () {
        var tabList = TabListUtil.CreateTabListData(options),
            i,
            len,
            tab;

        for (i = 0, len = tabList.length; i < len; i++) {
          tab = tabList[i];
          /* jshint -W030 */
          expect(tab.hasOwnProperty('title')).to.be.true;
          expect(tab.hasOwnProperty('content')).to.be.true;
          /* jshint +W030 */
        }
      });

    });
  });
});