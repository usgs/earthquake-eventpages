/* All singletons available in core module */
import { CoreModule } from './src/app/core/core.module';
export let EventpagesModule = CoreModule;

/* Make ShakeMap required services available */
export { EventService } from './src/app/core/event.service';
export { StationService } from './src/app/core/station.service';
export { MetadataService } from './src/app/core/metadata.service';

/* Make ShakeMap components available */
export { ShakemapModule } from './src/app/shakemap/shakemap.module';
