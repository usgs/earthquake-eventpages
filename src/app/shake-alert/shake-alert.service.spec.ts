import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShakeAlertService } from './shake-alert.service';

describe('ShakeAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShakeAlertService]
    });
  });

  it('should be created', inject(
    [ShakeAlertService],
    (service: ShakeAlertService) => {
      expect(service).toBeTruthy();
    }
  ));
});
