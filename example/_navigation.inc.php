<?php

print navGroup('Core',
    navItem('/core/DownloadViewExample.php', 'DownloadView')
  );

print navGroup('General',
    navItem('/general/TextProductViewExample.php', 'TextProductView') .
    navItem('/general/NearbyPlacesViewExample.php', 'Nearby Places View')
  );

print navGroup('Impact',
    navItem('/shakemap/ShakeMapStationListViewExample.php',
        'ShakeMapStationListView ') .
    navItem('/dyfi/DYFIResponsesViewExample.php', 'DYFIResponsesView')
  );
?>
