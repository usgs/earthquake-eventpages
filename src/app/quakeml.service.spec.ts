import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuakemlService } from './quakeml.service';

describe('QuakemlService', () => {
  let httpClient,
      injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuakemlService
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([QuakemlService], (service: QuakemlService) => {
    expect(service).toBeTruthy();
  }));
});
