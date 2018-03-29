import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';
import { HistoricSeismicityOverlay } from './map-overlay/historic-seismicity-overlay';

describe('RegionInfoOverlayPipe', () => {
  it('create an instance', () => {
    const pipe = new RegionInfoOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('includes HistoricSeismicityOverlay', () => {
    const pipe = new RegionInfoOverlaysPipe();
    expect(pipe.transform(null).some( (overlay) => {
      return (overlay instanceof HistoricSeismicityOverlay);
    })).toBeTruthy();
  });
});
