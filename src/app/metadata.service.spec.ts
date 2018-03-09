import { TestBed, inject } from '@angular/core/testing';

import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetadataService]
    });
  });

  it('should be created', inject([MetadataService], (service: MetadataService) => {
    expect(service).toBeTruthy();
  }));
});
