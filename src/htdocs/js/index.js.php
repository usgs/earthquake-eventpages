<?php
	/**
	 * This "Javascript" is included in-line by index.php. It inlines the
	 * EVENT object as a parameter to the EventPage. This removes the need for
	 * a global EVENT_FEED object.
	 */
?>
<script>
require.config({
	baseUrl: '.',
	paths: {
		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',

<<<<<<< HEAD
		base: 'base/0-0-1/js',
		dyfi: 'dyfi/0-0-1/js'
=======
		base: 'modules/base/0-0-1/js'
>>>>>>> Updated configuration to be more in EventPage and EventModule. Changed baseUrl so we do not have to use as many relative paths.
	},
	shim: {
	}
});

require([
	'base/EventPage'
], function (
	EventPage
) {
	'use strict';

	new EventPage({
<<<<<<< HEAD
		defaultPage: 'shakemap_intensity',
		container: document.querySelector('.event-content'),
		navigation: document.querySelector('.site-sectionnav'),
		eventDetails: <?php print json_encode($EVENT); ?>,
		modules: [
			{
				className: 'base/EventModule',
				options: {
					stub: 'shakemap',
					title: 'ShakeMap',
					pages: [
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'intensity',
								title: 'Intensity Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'stations',
								title: 'Station Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'pga',
								title: 'PGA Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'pgv',
								title: 'PGV Maps'
							}
						}
					]
				}
			},
			{
				className: 'dyfi/DYFIModule',
				options: {
					stub: 'dyfi',
					title: 'DYFI',
					pages: [
						{
							className: 'dyfi/DYFIMapPage',
							options: {
								stub: 'maps',
								title: 'Maps'
							}
						},
						{
							className: 'dyfi/DYFIGraphPage',
							options: {
								stub: 'graphs',
								title: 'Graphs'
							}
						},
						{
							className: 'dyfi/DYFIResponsesPage',
							options: {
								stub: 'responses',
								title: 'Responses'
							}
						}
					]
				}
			}
		]
=======
		eventDetails: <?php print json_encode($EVENT); ?>
>>>>>>> Updated configuration to be more in EventPage and EventModule. Changed baseUrl so we do not have to use as many relative paths.
	});
});
</script>
