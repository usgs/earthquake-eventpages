import { TestBed } from '@angular/core/testing';

import { FormSubmitService } from './form-submit.service';

describe('FormSubmitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormSubmitService = TestBed.get(FormSubmitService);
    expect(service).toBeTruthy();
  });
});
