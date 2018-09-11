import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { NearbyCitiesService } from './nearby-cities.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('NearbyCitiesService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  afterEach(() => {
    httpClient.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NearbyCitiesService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject(
    [NearbyCitiesService],
    (service: NearbyCitiesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
