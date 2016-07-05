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
require('./spec/core/AccordionViewTest');
require('./spec/core/AttributionTest');
require('./spec/core/BasicPinViewTest');
require('./spec/core/DownloadViewTest');
require('./spec/core/EventPageTest');
require('./spec/core/FormatterTest');
require('./spec/core/LinkProductViewTest');
require('./spec/core/SummaryModuleTest');
require('./spec/core/TextProductViewTest');

require('./spec/dyfi/DYFIFormModuleTest');
require('./spec/dyfi/DYFIFormViewTest');
require('./spec/dyfi/DYFIIntensityGraphViewTest');
require('./spec/dyfi/DYFIModuleTest');
require('./spec/dyfi/DYFIResponsesViewTest');
require('./spec/dyfi/DYFIViewTest');
require('./spec/dyfi/TextQuestionViewTest');

require('./spec/finite-fault/FiniteFaultModuleTest');
require('./spec/finite-fault/FiniteFaultViewTest');

require('./spec/focal-mechanism/FocalMechanismModuleTest');
require('./spec/focal-mechanism/FocalMechanismViewTest');

require('./spec/general/ExecutiveSummaryModuleTest');
require('./spec/general/GeneralSummaryModuleTest');
require('./spec/general/GeoserveNearbyPlacesViewTest');
require('./spec/general/GeoserveRegionSummaryViewTest');
require('./spec/general/NearbyPlacesViewTest');
require('./spec/general/TsunamiPinViewTest');

require('./spec/impact/ImpactSummaryModuleTest');

require('./spec/losspager/PAGERModuleTest');
require('./spec/losspager/PAGERPinViewTest');
require('./spec/losspager/PAGERViewTest');
require('./spec/losspager/PagerXmlParserTest');

require('./spec/map/InteractiveMapModuleTest');
require('./spec/map/InteractiveMapViewTest');

require('./spec/moment-tensor/BeachBallViewTest');
require('./spec/moment-tensor/CanvasTest');
require('./spec/moment-tensor/MomentTensorModuleTest');
require('./spec/moment-tensor/MomentTensorViewTest');
require('./spec/moment-tensor/TensorTest');

require('./spec/origin/MagnitudesViewTest');
require('./spec/origin/OriginModuleTest');
require('./spec/origin/OriginPinViewTest');
require('./spec/origin/OriginViewTest');
require('./spec/origin/PhasesViewTest');
require('./spec/origin/QuakemlViewTest');

require('./spec/pdl/CatalogEventTest');
require('./spec/pdl/ContentTest');
require('./spec/pdl/ProductTest');

require('./spec/scientific/ScientificSummaryModuleTest');

require('./spec/shakemap/ShakeMapInfoViewTest');
require('./spec/shakemap/ShakeMapModuleTest');
require('./spec/shakemap/ShakeMapPinViewTest');
require('./spec/shakemap/ShakeMapStationListViewTest');
require('./spec/shakemap/ShakeMapViewTest');

require('./spec/waveform/WaveformModuleTest');

if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}
