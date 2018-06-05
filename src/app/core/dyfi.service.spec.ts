import { TestBed, inject } from '@angular/core/testing';

import { DyfiService } from './dyfi.service';

describe('DyfiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DyfiService]
    });
  });

  it('should be created', inject([DyfiService], (service: DyfiService) => {
    expect(service).toBeTruthy();
  }));
});
