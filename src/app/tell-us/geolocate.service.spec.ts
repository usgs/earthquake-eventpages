import { TestBed } from '@angular/core/testing';

import { GeolocateService } from './geolocate.service';

describe('GeolocateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocateService = TestBed.get(GeolocateService);
    expect(service).toBeTruthy();
  });
});
