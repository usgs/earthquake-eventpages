import { TestBed } from '@angular/core/testing';

import { GeoService } from './geo.service';

describe('GeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoService = TestBed.get(GeoService);
    expect(service).toBeTruthy();
  });
});
