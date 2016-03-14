<?php

print navItem('/example.php', 'Examples Index');

print navGroup('Core',
    navItem('/core/DownloadViewExample.php', 'DownloadView') .
    navItem('/core/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('General',
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View')
  );

print navGroup('Impact',
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView') .
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/shakemap/ShakeMapViewExample.php', 'ShakeMapView')
  );

print navGroup('Scientific',
    navItem('/finitefault/FiniteFaultViewExample.php', 'FiniteFaultView')
  );

?>
