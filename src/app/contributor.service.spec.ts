import { TestBed, inject } from '@angular/core/testing';

import { ContributorService } from './contributor.service';

describe('ContributorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributorService]
    });
  });

  it('should be created', inject([ContributorService], (service: ContributorService) => {
    expect(service).toBeTruthy();
  }));
});
