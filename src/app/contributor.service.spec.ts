import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContributorService } from './contributor.service';
import { environment } from '../environments/environment';

describe('ContributorService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ContributorService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([ContributorService], (service: ContributorService) => {
    expect(service).toBeTruthy();
  }));
});
