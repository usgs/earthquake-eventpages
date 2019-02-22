import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { FormSubmitService } from './form-submit.service';

describe('FormSubmitService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormSubmitService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    const service: FormSubmitService = TestBed.get(FormSubmitService);
    expect(service).toBeTruthy();
  });
});
