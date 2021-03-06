import * as CovJSON from 'covjson-reader';

import * as L from 'leaflet';

import { AsynchronousCovJSONOverlay } from './asynchronous-covjson-overlay';


describe('AsynchronousCovJSONOverlay', () => {
  let overlay;

  // tslint:disable-next-line:max-line-length
  const COVERAGE_URL = 'https://earthquake.usgs.gov/archive/product/shakemap/us60007ewc/us/1583422966894/download/coverage_mmi_low_res.covjson';

  beforeEach(() => {
    overlay = new AsynchronousCovJSONOverlay();
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('is a layer group', () => {
    expect(overlay instanceof L.LayerGroup).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('loadData', () => {
    it('handles null url', () => {
      overlay.loadData();

      expect(overlay.data).toBe(null);
    });

    it('handles success', () => {
      overlay.url = COVERAGE_URL;
      overlay.loadData();
    });

    it('handles url get failure', () => {
      overlay.url = 'url';
      overlay.loadData();
    });
  });

  describe('addCoverage', () => {
    it('handles success', () => {
      CovJSON.read(COVERAGE_URL).then((cov) => {
        overlay.addCoverage(cov);
        expect(overlay.data).toBeTruthy();
      });
    });
  });

  describe('onAdd', () => {
    it('calls loadData', () => {
      spyOn(overlay, 'loadData');
      overlay.onAdd({ loadData: () => {}, on: () => {} });
      expect(overlay.loadData).toHaveBeenCalled();
    });
  });
});
