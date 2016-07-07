'use strict';

var config = require('./config');


var CWD,
    JS,
    NODE_MODULES;

CWD = process.cwd();
NODE_MODULES = CWD + '/node_modules';
JS = './' + config.src + '/htdocs/js';


var ALL_CLASSES = [
  JS + '/core/AccordionView.js:core/AccordionView',
  JS + '/core/Attribution.js:core/Attribution',
  JS + '/core/BasicPinView.js:core/BasicPinView',
  JS + '/core/ContentView.js:core/ContentView',
  JS + '/core/CooperatorLogo.js:core/CooperatorLogo',
  JS + '/core/DownloadView.js:core/DownloadView',
  JS + '/core/EventPage.js:core/EventPage',
  JS + '/core/Formatter.js:core/Formatter',
  JS + '/core/LinkProductView.js:core/LinkProductView',
  JS + '/core/Module.js:core/Module',
  JS + '/core/ProductView.js:core/ProductView',
  JS + '/core/SummaryModule.js:core/SummaryModule',
  JS + '/core/TextProductView.js:core/TextProductView',

  JS + '/dyfi/DYFIFormModule.js:dyfi/DYFIFormModule',
  JS + '/dyfi/DYFIFormPinView.js:dyfi/DYFIFormPinView',
  JS + '/dyfi/DYFIFormView.js:dyfi/DYFIFormView',
  JS + '/dyfi/DYFIIntensityGraphView.js:dyfi/DYFIIntensityGraphView',
  JS + '/dyfi/DYFIModule.js:dyfi/DYFIModule',
  JS + '/dyfi/DYFIResponsesView.js:dyfi/DYFIResponsesView',
  JS + '/dyfi/DYFIPinView.js:dyfi/DYFIPinView',
  JS + '/dyfi/DYFIView.js:dyfi/DYFIView',
  JS + '/dyfi/StandardDeviationLineView.js:dyfi/StandardDeviationLineView',
  JS + '/dyfi/TextQuestionView.js:dyfi/TextQuestionView',

  JS + '/finite-fault/FiniteFaultModule.js:finite-fault/FiniteFaultModule',
  JS + '/finite-fault/FiniteFaultPinView.js:finite-fault/FiniteFaultPinView',
  JS + '/finite-fault/FiniteFaultView.js:finite-fault/FiniteFaultView',

  JS + '/focal-mechanism/FocalMechanismModule.js:focal-mechanism/FocalMechanismModule',
  JS + '/focal-mechanism/FocalMechanismView.js:focal-mechanism/FocalMechanismView',

  JS + '/general/ExecutiveSummaryModule.js:general/ExecutiveSummaryModule',
  JS + '/general/GeneralSummaryModule.js:general/GeneralSummaryModule',
  JS + '/general/GeoserveNearbyPlacesView.js:general/GeoserveNearbyPlacesView',
  JS + '/general/GeoserveRegionSummaryView.js:general/GeoserveRegionSummaryView',
  JS + '/general/LocationView.js:general/LocationView',
  JS + '/general/NearbyPlacesView.js:general/NearbyPlacesView',
  JS + '/general/RegionalInfoModule.js:general/RegionalInfoModule',
  JS + '/general/TsunamiPinView.js:general/TsunamiPinView',

  JS + '/impact/ImpactPinView.js:impact/ImpactPinView',
  JS + '/impact/ImpactSummaryModule.js:impact/ImpactSummaryModule',

  JS + '/losspager/PAGERModule.js:losspager/PAGERModule',
  JS + '/losspager/PAGERPinView.js:losspager/PAGERPinView',
  JS + '/losspager/PAGERView.js:losspager/PAGERView',
  JS + '/losspager/PagerXmlParser.js:losspager/PagerXmlParser',

  JS + '/map/ContoursLayer.js:map/ContoursLayer',
  JS + '/map/DyfiUtmLayer.js:map/DyfiUtmLayer',
  JS + '/map/InteractiveMapModule.js:map/InteractiveMapModule',
  JS + '/map/InteractiveMapPinView.js:map/InteractiveMapPinView',
  JS + '/map/InteractiveMapView.js:map/InteractiveMapView',
  JS + '/map/ShakeMapStationLayer.js:map/ShakeMapStationLayer',

  JS + '/moment-tensor/BeachBallView.js:moment-tensor/BeachBallView',
  JS + '/moment-tensor/Canvas.js:moment-tensor/Canvas',
  JS + '/moment-tensor/MomentTensorModule.js:moment-tensor/MomentTensorModule',
  JS + '/moment-tensor/MomentTensorPinView.js:moment-tensor/MomentTensorPinView',
  JS + '/moment-tensor/MomentTensorView.js:moment-tensor/MomentTensorView',
  JS + '/moment-tensor/Tensor.js:moment-tensor/Tensor',

  JS + '/origin/MagnitudesView.js:origin/MagnitudesView',
  JS + '/origin/OriginModule.js:origin/OriginModule',
  JS + '/origin/OriginPinView.js:origin/OriginPinView',
  JS + '/origin/OriginView.js:origin/OriginView',
  JS + '/origin/PhasesView.js:origin/PhasesView',
  JS + '/origin/QuakemlView.js:origin/QuakemlView',

  JS + '/pdl/CatalogEvent.js:pdl/CatalogEvent',
  JS + '/pdl/Content.js:pdl/Content',
  JS + '/pdl/Product.js:pdl/Product',

  JS + '/scientific/ScientificSummaryModule.js:scientific/ScientificSummaryModule',

  JS + '/shakemap/ShakeMapInfoView.js:shakemap/ShakeMapInfoView',
  JS + '/shakemap/ShakeMapModule.js:shakemap/ShakeMapModule',
  JS + '/shakemap/ShakeMapPinView.js:shakemap/ShakeMapPinView',
  JS + '/shakemap/ShakeMapStationListView.js:shakemap/ShakeMapStationListView',
  JS + '/shakemap/ShakeMapView.js:shakemap/ShakeMapView',

  JS + '/waveform/WaveformModule.js:waveform/WaveformModule',

  NODE_MODULES + '/hazdev-tablist/src/tablist/TabList.js:tablist/TabList',
  NODE_MODULES + '/hazdev-webutils/src/mvc/Model.js:mvc/Model',
  NODE_MODULES + '/hazdev-webutils/src/mvc/View.js:mvc/View',
  NODE_MODULES + '/hazdev-webutils/src/util/Events.js:util/Events',
  NODE_MODULES + '/hazdev-webutils/src/util/Util.js:util/Util',
  NODE_MODULES + '/hazdev-webutils/src/util/Xhr.js:util/Xhr',
  NODE_MODULES + '/hazdev-svgimagemap/src/svgimagemap/SvgImageMap.js:svgimagemap/SvgImageMap'
];


var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        CWD + '/' + config.src + '/htdocs/js',
        NODE_MODULES + '/hazdev-accordion/src',
        NODE_MODULES + '/hazdev-geoserve-ws/src/htdocs/js',
        NODE_MODULES + '/hazdev-d3/src',
        NODE_MODULES + '/hazdev-leaflet/src',
        NODE_MODULES + '/hazdev-location-view/src',
        NODE_MODULES + '/hazdev-question-view/src',
        NODE_MODULES + '/hazdev-svgimagemap/src',
        NODE_MODULES + '/hazdev-tablist/src',
        NODE_MODULES + '/hazdev-webutils/src',
        NODE_MODULES + '/quakeml-parser-js/src'
      ]
    }
  },

  // source bundles
  'classes': {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/js/classes.js',
    options: {
      alias: ALL_CLASSES
    }
  },

  'event': {
    src: [config.src + '/htdocs/js/event.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/event.js',
    options: {
    }
  },

  // test bundle
  'test': {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: ALL_CLASSES
    }
  }
};


module.exports = browserify;
