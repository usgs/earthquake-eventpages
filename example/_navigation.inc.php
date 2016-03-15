<?php

print navItem('/example.php', 'Examples Index');

print navGroup('Core',
    navItem('/core/DownloadViewExample.php', 'DownloadView') .
    navItem('/core/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('General',
    navItem('/map/InteractiveMapViewExample.php', 'Interactive Map') .
    navItem('/general/GeoserveNearbyPlacesViewExample.php',
        'Geoserve Nearby Places View') .
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View')
  );

print navGroup('Impact',
    navItem('/dyfi/DYFIViewExample.php', 'DYFIView') .
    navItem('/dyfi/DYFIIntensityGraphViewExample.php', 'DYFIIntensityGraphView') .
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView') .
    navItem('/losspager/PAGERViewExample.php', 'PAGER View') .
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/shakemap/ShakeMapViewExample.php', 'ShakeMapView')
  );

print navGroup('Scientific',
    navItem('/moment-tensor/BeachBallViewExample.php', 'BeachBallView') .
    navItem('/finitefault/FiniteFaultViewExample.php', 'FiniteFaultView') .
    navItem('/focal-mechanism/FocalMechanismViewExample.php', 'FocalMechanismView') .
    navItem('/origin/MagnitudesViewExample.php', 'MagnitudesView') .
    navItem('/moment-tensor/MomentTensorViewExample.php', 'MomentTensorView')
  );

?>
