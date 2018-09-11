import { TestBed, inject } from '@angular/core/testing';

import { NearbyCitiesService } from './nearby-cities.service';

describe('NearbyCitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NearbyCitiesService]
    });
  });

  it('should be created', inject([NearbyCitiesService], (service: NearbyCitiesService) => {
    expect(service).toBeTruthy();
  }));
});
