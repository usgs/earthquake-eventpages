import { TestBed, inject } from '@angular/core/testing';

import { ConfService } from './conf.service';

describe('ConfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfService]
    });
  });

  it('should be created', inject([ConfService], (service: ConfService) => {
    expect(service).toBeTruthy();
  }));
});
