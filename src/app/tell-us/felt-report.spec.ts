import { FeltReport } from './felt-report';

describe('FeltReport', () => {
  let testFeltReport: FeltReport;

  beforeEach(() => {
    testFeltReport = new FeltReport();
  });

  it('should create an instance', () => {
    expect(new FeltReport()).toBeTruthy();
  });

  describe('get ciim_mapAddress(), ciim_mapLat(), ciim_mapLon()', () => {
    it('should return value or null instead of undefined', () => {
      const latitude = 35;
      const longitude = -105;
      const address = 'Golden, CO';

      testFeltReport.location = {
        address: address,
        latitude: latitude,
        longitude: longitude
      };

      expect(testFeltReport.ciim_mapAddress).toBe(address);
      expect(testFeltReport.ciim_mapLat).toBe(latitude);
      expect(testFeltReport.ciim_mapLon).toBe(longitude);

      testFeltReport.location = null;

      expect(testFeltReport.ciim_mapAddress).toBe(null);
      expect(testFeltReport.ciim_mapLat).toBe(null);
      expect(testFeltReport.ciim_mapLon).toBe(null);
    });
  });

  describe('set ciim_mapAddress()', () => {
    it('latitude and longitude should be wiped when address is changed', () => {
      const address = 'Golden, CO';

      testFeltReport.ciim_mapAddress = address;

      expect(testFeltReport.ciim_mapAddress).toBe(address);
      expect(testFeltReport.ciim_mapLat).toBe(null);
      expect(testFeltReport.ciim_mapLon).toBe(null);
    });
  });

  describe('get valid()', () => {
    it('fails when felt, time, or location are not set', () => {
      testFeltReport.fldSituation_felt = 0;
      testFeltReport.ciim_time = '1 minute ago';
      testFeltReport.location = null;

      expect(testFeltReport.valid.value).toBe(false);

      testFeltReport.fldSituation_felt = 0;
      testFeltReport.ciim_time = null;
      testFeltReport.location = {
        address: 'Golden, CO'
      };

      expect(testFeltReport.valid.value).toBe(false);

      testFeltReport.fldSituation_felt = null;
      testFeltReport.ciim_time = '1 minute ago';
      testFeltReport.location = {
        address: 'Golden, CO'
      };

      expect(testFeltReport.valid.value).toBe(false);
    });
    it('succeeds when felt, time, or location are set', () => {
      testFeltReport.fldSituation_felt = 0;
      testFeltReport.ciim_time = '1 minute ago';
      testFeltReport.location = {
        address: 'Golden, CO'
      };

      expect(testFeltReport.valid.value).toBe(true);
    });
  });
});
