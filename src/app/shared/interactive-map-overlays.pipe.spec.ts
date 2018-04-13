import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { Event } from '../event';
import { HistoricSeismicityOverlay } from '../shared/map-overlay/historic-seismicity-overlay';
import { convertToParamMap } from '@angular/router';
import { EpicenterOverlay } from '../shared/map-overlay/epicenter-overlay';

describe('InteractiveMapOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new InteractiveMapOverlaysPipe();
    expect(pipe).toBeTruthy();
  });
});
