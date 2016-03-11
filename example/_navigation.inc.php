<?php

print navGroup('Core',
    navItem('/core/DownloadViewExample.php', 'DownloadView') .
    navItem('/core/TextProductViewExample.php', 'TextProductView')
  );

print navGroup('General',
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View')
  );

print navGroup('Impact',
    navItem('/shakemap/ShakeMapInfoViewExample.php', 'ShakeMapInfoView') .
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView')
  );

?>
