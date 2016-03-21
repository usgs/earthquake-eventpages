/* global mocha */
'use strict';

// PhantomJS is missing native bind support,
//     https://github.com/ariya/phantomjs/issues/10522
// Polyfill from:
//     https://developer.mozilla.org
//         /en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable
      throw new TypeError('object to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        FNOP = function () {},
        fBound;

    fBound = function () {
      return fToBind.apply(
          (this instanceof FNOP && oThis ? this : oThis),
          aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    FNOP.prototype = this.prototype;
    fBound.prototype = new FNOP();

    return fBound;
  };
}


mocha.setup('bdd');

// Add each test class here as they are implemented
require('./spec/core/DownloadViewTest');
require('./spec/core/EventPageTest');
require('./spec/core/FormatterTest');
require('./spec/core/TextProductViewTest');

require('./spec/dyfi/DYFIFormModuleTest');
require('./spec/dyfi/DYFIModuleTest');
require('./spec/dyfi/DYFIViewTest');
require('./spec/dyfi/DYFIIntensityGraphViewTest');
require('./spec/dyfi/DYFIResponsesViewTest');

require('./spec/finitefault/FiniteFaultViewTest');

require('./spec/general/GeoserveNearbyPlacesViewTest');
require('./spec/general/NearbyPlacesViewTest');

require('./spec/map/InteractiveMapModuleTest');
require('./spec/map/InteractiveMapViewTest');

require('./spec/moment-tensor/BeachBallViewTest');
require('./spec/moment-tensor/CanvasTest');
require('./spec/moment-tensor/MomentTensorViewTest');
require('./spec/moment-tensor/TensorTest');

require('./spec/pager/PAGERModuleTest');

require('./spec/pdl/ContentTest');
require('./spec/pdl/ProductTest');

require('./spec/shakemap/ShakeMapModuleTest');
require('./spec/shakemap/ShakeMapStationListViewTest');
require('./spec/shakemap/ShakeMapViewTest');

// require('./spec/modules/base/EventPageTest');
// require('./spec/modules/base/EventModuleTest');
// require('./spec/modules/base/EventModulePageTest');
// require('./spec/modules/base/EventUtilTest');
// require('./spec/modules/summary/SummaryPageTest');
// require('./spec/modules/summary/InteractiveMapTest');
// require('./spec/modules/impact/ImpactModuleTest');
// require('./spec/modules/impact/DYFIPageTest');
// require('./spec/modules/impact/DYFIFormPageTest');
// require('./spec/modules/impact/ShakeMapPageTest');
// require('./spec/modules/impact/PagerPageTest');
// require('./spec/modules/impact/PagerXmlParserTest');
// require('./spec/modules/scientific/HypocenterPageTest');
// require('./spec/modules/scientific/ScientificSummaryPageTest');
// require('./spec/modules/scientific/TensorTest');
// require('./spec/modules/scientific/MomentTensorTest');

if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}
