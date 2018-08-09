import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { environment } from '../../environments/environment';
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

  describe('getEvent', () => {
    it('handles successes', inject([EventService], (service: EventService) => {
      const expectedEvent = {id: 'abcd'};

      service.getEvent(expectedEvent.id);
      const req = httpClient.expectOne(`${environment.EVENT_SERVICE}/${expectedEvent.id}.geojson`);
      req.flush(expectedEvent);

      service.event$.subscribe((event) => {
        expect(event.id).toEqual(expectedEvent.id);
      });
    }));

    it('handles errors', inject([EventService], (service: EventService) => {
      service.getEvent('1234');

      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Server Error',
        url: `${environment.EVENT_SERVICE}/1234.geojson`
      });
      const req = httpClient.expectOne(error.url);

      req.flush(error, {
        status: 500,
        statusText: 'Server Error'}
      );

      service.event$.subscribe((event) => {
        expect(event.id).toBe('1234');
        expect(event.data.status).toBe(500);
        expect(event.data.message).toBe(error.message);
        expect(event.data.type).toBe('Error');
      });
    }));

    it('handles deletes', inject([EventService], (service: EventService) => {
      const deletedEvent = {id: 'deleted'};
      service.getEvent(deletedEvent.id);
      let req = httpClient.expectOne(`${environment.EVENT_SERVICE}/${deletedEvent.id}.geojson`);

      req.flush('Error 409: Conflict', {
        status: 409,
        statusText: 'Conflict'
      });

      req = httpClient.expectOne(`${environment.DELETED_EVENT_SERVICE}&eventid=${deletedEvent.id}`);
      req.flush(deletedEvent);

      service.event$.subscribe((event) => {
        expect(event.id).toEqual(deletedEvent.id);
      });
    }));

    it('streamlines repeats', inject([EventService],
          (service: EventService) => {
      let req;

      service.getEvent('first');
      req = httpClient.expectOne(`${environment.EVENT_SERVICE}/first.geojson`);
      expect(req.request.method).toEqual('GET');
      req.flush({id: 'first'});

      service.getEvent('first');
      req = httpClient.expectOne(`${environment.EVENT_SERVICE}/first.geojson`);
      expect(req.request.method).toEqual('GET');
      req.flush({id: 'first'});
    }));
  });

  describe('getProduct', () => {
    it('sets product on event', inject([EventService],
          (service: EventService) => {
      let event;
      service.event$.subscribe((e) => { event = e; });
      spyOn(event, 'getProduct');

      service.getProduct('type', 'source', 'code');
      expect(event.getProduct.calls.count()).toBe(1);
      expect(event.getProduct).toHaveBeenCalledWith('type', 'source', 'code');
    }));
  });
});
