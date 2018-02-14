import { TestBed, inject } from '@angular/core/testing';

import { ContentsXmlService } from './contents-xml.service';

describe('ContentsXmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentsXmlService]
    });
  });

  it('should be created', inject([ContentsXmlService], (service: ContentsXmlService) => {
    expect(service).toBeTruthy();
  }));
});
