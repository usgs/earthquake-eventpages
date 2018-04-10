import { TestBed, inject } from '@angular/core/testing';

import { AsyncMapLayerService } from './async-map-layer.service';

describe('AsyncMapLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncMapLayerService]
    });
  });

  it('should be created', inject([AsyncMapLayerService], (service: AsyncMapLayerService) => {
    expect(service).toBeTruthy();
  }));
});
