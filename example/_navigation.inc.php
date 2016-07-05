<?php

print navItem('/example.php', 'Examples Index');

print navGroup('Core',
    navItem('/core/BasicPinViewExample.php', 'BasicPinView') .
    navItem('/core/DownloadViewExample.php', 'DownloadView') .
    navItem('/core/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('General',
    navItem('/map/InteractiveMapViewExample.php', 'Interactive Map') .
    navItem('/general/GeoserveNearbyPlacesViewExample.php',
        'Geoserve Nearby Places View') .
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View') .
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
    navItem('/losspager/PAGERPinViewExample.php', 'PAGERPin View') .
    navItem('/losspager/PAGERViewExample.php', 'PAGER View') .
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/shakemap/ShakeMapViewExample.php', 'ShakeMapView')
  );

print navGroup('Scientific',
    navItem('/moment-tensor/BeachBallViewExample.php', 'BeachBallView') .
    navItem('/finite-fault/FiniteFaultViewExample.php', 'FiniteFaultView') .
    navItem('/focal-mechanism/FocalMechanismViewExample.php', 'FocalMechanismView') .
    navItem('/origin/MagnitudesViewExample.php', 'MagnitudesView') .
    navItem('/origin/OriginViewExample.php', 'OriginView') .
    navItem('/origin/OriginPinViewExample.php', 'OriginPinView') .
    navItem('/origin/PhasesViewExample.php', 'PhasesView') .
    navItem('/moment-tensor/MomentTensorViewExample.php', 'MomentTensorView')
  );

?>
