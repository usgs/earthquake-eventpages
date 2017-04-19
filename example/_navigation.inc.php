<?php

print navItem('/example.php', 'Examples Index');

print navGroup('Core',
    navItem('/core/BasicPinViewExample.php', 'BasicPinView') .
    navItem('/core/DownloadViewExample.php', 'DownloadView') .
    navItem('/core/TextProductPinViewExample.php', 'TextProductPinView') .
    navItem('/core/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('General',
    navItem('/general/GeoserveNearbyPlacesViewExample.php',
        'Geoserve Nearby Places View') .
    navItem('/map/InteractiveMapPinViewExample.php', 'Interactive Map Pin') .
    navItem('/map/InteractiveMapViewExample.php', 'Interactive Map') .
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View') .
    navItem('/general/RegionalInfoPinViewExample.php', 'RegionalInfoPinView') .
    navItem('/general/TsunamiPinViewExample.php', 'Tsunami Pin View')
  );

print navGroup('Impact',
    navItem('/dyfi/DYFIFormPinViewExample.php', 'DYFIFormPinView') .
    navItem('/dyfi/DYFIFormViewExample.php', 'DYFIFormView') .
    navItem('/dyfi/DYFIIntensityGraphViewExample.php',
        'DYFIIntensityGraphView') .
    navItem('/dyfi/DYFIPinViewExample.php', 'DYFIPinView') .
    navItem('/dyfi/DYFIViewExample.php', 'DYFIView') .
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView') .
    navItem('/losspager/PAGERPinViewExample.php', 'PAGERPinView') .
    navItem('/losspager/PAGERViewExample.php', 'PAGERView') .
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/shakemap/ShakeMapViewExample.php', 'ShakeMapView') .
    navItem('/shakemap/ShakeMapPinViewExample.php', 'ShakeMapPinView')
  );

print navGroup('Scientific',
    navItem('/moment-tensor/BeachBallViewExample.php', 'BeachBallView') .
    navItem('/finite-fault/FiniteFaultPinViewExample.php', 'FiniteFaultPinView') .
    navItem('/finite-fault/FiniteFaultViewExample.php', 'FiniteFaultView') .
    navItem('/focal-mechanism/FocalMechanismPinViewExample.php',
        'FocalMechanismPinView') .
    navItem('/focal-mechanism/FocalMechanismViewExample.php',
        'FocalMechanismView') .
    navItem('/origin/MagnitudesViewExample.php', 'MagnitudesView') .
    navItem('/origin/OriginPinViewExample.php', 'OriginPinView') .
    navItem('/origin/OriginViewExample.php', 'OriginView') .
    navItem('/origin/PhasesViewExample.php', 'PhasesView') .
    navItem('/moment-tensor/MomentTensorPinViewExample.php',
        'MomentTensorPinView') .
    navItem('/moment-tensor/MomentTensorViewExample.php',
        'MomentTensorView')
  );

?>
