import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [EventService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));

  describe('empty', () => {
    it('should put null', inject([EventService], (service: EventService) => {
      const spy = jasmine.createSpy('event spy');
      const subscription = service.event$.subscribe(spy);

      service.empty();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(null);

      subscription.unsubscribe();
    }));
  });
});
