import { TestBed, inject } from '@angular/core/testing';

import { QuakemlService } from './quakeml.service';

describe('QuakemlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuakemlService]
    });
  });

  it('should be created', inject([QuakemlService], (service: QuakemlService) => {
    expect(service).toBeTruthy();
  }));
});
