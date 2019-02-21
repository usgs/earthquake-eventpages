import { FeltReport } from './felt-report';

describe('FeltReport', () => {
  beforeEach(() => {
    this.feltReport = new FeltReport();
  });

  it('should create an instance', () => {
    expect(new FeltReport()).toBeTruthy();
  });

  describe('get ciim_mapAddress(), ciim_mapLat(), ciim_mapLon()', () => {
    it('should return value or null instead of undefined', () => {
      const latitude = 35;
      const longitude = -105;
      const address = 'Golden, CO';

      this.feltReport.location = {
        address: address,
        latitude: latitude,
        longitude: longitude
      };

      expect(this.feltReport.ciim_mapAddress).toBe(address);
      expect(this.feltReport.ciim_mapLat).toBe(latitude);
      expect(this.feltReport.ciim_mapLon).toBe(longitude);

      this.feltReport.location = null;

      expect(this.feltReport.ciim_mapAddress).toBe(null);
      expect(this.feltReport.ciim_mapLat).toBe(null);
      expect(this.feltReport.ciim_mapLon).toBe(null);
    });
  });

  describe('set ciim_mapAddress()', () => {
    it('latitude and longitude should be wiped when address is changed', () => {
      const address = 'Golden, CO';

      this.feltReport.ciim_mapAddress = address;

      expect(this.feltReport.ciim_mapAddress).toBe(address);
      expect(this.feltReport.ciim_mapLat).toBe(null);
      expect(this.feltReport.ciim_mapLon).toBe(null);
    });
  });

  describe('get valid()', () => {
    it('fails when felt, time, or location are not set', () => {
      this.feltReport.fldSituation_felt = 0;
      this.feltReport.ciim_time = '1 minute ago';
      this.feltReport.location = null;

      expect(this.feltReport.valid.value).toBe(false);

      this.feltReport.fldSituation_felt = 0;
      this.feltReport.ciim_time = null;
      this.feltReport.location = {
        address: 'Golden, CO'
      };

      expect(this.feltReport.valid.value).toBe(false);

      this.feltReport.fldSituation_felt = null;
      this.feltReport.ciim_time = '1 minute ago';
      this.feltReport.location = {
        address: 'Golden, CO'
      };

      expect(this.feltReport.valid.value).toBe(false);
    });
    it('succeeds when felt, time, or location are set', () => {
      this.feltReport.fldSituation_felt = 0;
      this.feltReport.ciim_time = '1 minute ago';
      this.feltReport.location = {
        address: 'Golden, CO'
      };

      expect(this.feltReport.valid.value).toBe(true);
    });
  });
});
