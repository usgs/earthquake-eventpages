import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { DyfiService } from './dyfi.service';

describe('DyfiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DyfiService]
    });
  });

  it('should be created', inject([DyfiService], (service: DyfiService) => {
    expect(service).toBeTruthy();
  }));
});
