<?php

print navGroup('Core',
    navItem('/core/DownloadViewExample.php', 'DownloadView')
  );

print navGroup('General',
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View') .
    navItem('/general/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('Impact',
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView') .
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/shakemap/ShakeMapViewExample.php', 'ShakeMapView')
  );

?>
