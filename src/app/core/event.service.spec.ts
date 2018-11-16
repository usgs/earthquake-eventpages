import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '../../environments/environment';
import { EventService } from './event.service';

describe('EventService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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
      const expectedEvent = { id: 'abcd' };

      service.getEvent(expectedEvent.id);
      const req = httpClient.expectOne(
        service.getEventDetailsUrl(expectedEvent.id)
      );
      req.flush(expectedEvent);

      service.event$.subscribe(event => {
        expect(event.id).toEqual(expectedEvent.id);
      });
    }));

    it('handles errors', inject([EventService], (service: EventService) => {
      const eventid = '1234';
      service.getEvent(eventid);

      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Server Error',
        url: service.getEventDetailsUrl(eventid)
      });
      const req = httpClient.expectOne(error.url);

      req.flush(error, {
        status: 500,
        statusText: 'Server Error'
      });

      service.event$.subscribe(event => {
        expect(event.id).toBe('1234');
        expect(event.data.status).toBe(500);
        expect(event.data.message).toBe(error.message);
        expect(event.data.type).toBe('Error');
      });
    }));

    it('handles 404 errors', inject([EventService], (service: EventService) => {
      const spy = spyOn(service, 'getUnknownEvent');
      const unknownEvent = { id: '123321' };
      service.getEvent(unknownEvent.id);
      const req = httpClient.expectOne(
        service.getEventDetailsUrl(unknownEvent.id)
      );

      req.flush('Error 404: Unknown Event', {
        status: 404,
        statusText: 'Unknown Event'
      });

      expect(spy).toHaveBeenCalled();
    }));

    it('handles deletes', inject([EventService], (service: EventService) => {
      const deletedEvent = { id: 'deleted' };
      service.getEvent(deletedEvent.id);
      let req = httpClient.expectOne(
        service.getEventDetailsUrl(deletedEvent.id)
      );

      req.flush('Error 409: Conflict', {
        status: 409,
        statusText: 'Conflict'
      });

      req = httpClient.expectOne(
        `${environment.DELETED_EVENT_SERVICE}&eventid=${deletedEvent.id}`
      );
      req.flush(deletedEvent);

      service.event$.subscribe(event => {
        expect(event.id).toEqual(deletedEvent.id);
      });
    }));

    it('streamlines repeats', inject(
      [EventService],
      (service: EventService) => {
        let req;
        const eventid = 'first';

        service.getEvent(eventid);
        req = httpClient.expectOne(service.getEventDetailsUrl(eventid));
        expect(req.request.method).toEqual('GET');
        req.flush({ id: eventid });

        service.getEvent(eventid);
        req = httpClient.expectOne(service.getEventDetailsUrl(eventid));
        expect(req.request.method).toEqual('GET');
        req.flush({ id: eventid });
      }
    ));
  });

  describe('getProduct', () => {
    it('sets product on event', inject(
      [EventService],
      (service: EventService) => {
        let event;
        service.event$.subscribe(e => {
          event = e;
        });
        spyOn(event, 'getProduct');

        service.getProduct('type', 'source', 'code');
        expect(event.getProduct.calls.count()).toBe(1);
        expect(event.getProduct).toHaveBeenCalledWith('type', 'source', 'code');
      }
    ));
  });

  describe('isScenario function', () => {
    const scenarioEvent = {
      properties: {
        products: {
          'some-scenario': [{ type: 'test' }]
        }
      }
    };

    const event = {
      properties: {
        products: {
          'some-event': [{ type: 'test' }]
        }
      }
    };

    const noProductsEvent = {
      properties: {}
    };

    const nullProductsEvent = {
      properties: {
        products: null
      }
    };

    it('returns true for scenario event', inject(
      [EventService],
      (service: EventService) => {
        const isScenario = service.isScenarioEvent(scenarioEvent);
        expect(isScenario).toBeTruthy();
      }
    ));

    it('returns false for actual event', inject(
      [EventService],
      (service: EventService) => {
        const isScenario = service.isScenarioEvent(event);
        expect(isScenario).toBeFalsy();
      }
    ));

    it('returns false for no properties', inject(
      [EventService],
      (service: EventService) => {
        const isScenario = service.isScenarioEvent(noProductsEvent);
        expect(isScenario).toBeFalsy();
      }
    ));

    it('returns false for null', inject(
      [EventService],
      (service: EventService) => {
        const isScenario = service.isScenarioEvent(null);
        expect(isScenario).toBeFalsy();
      }
    ));

    it('returns false for null products', inject(
      [EventService],
      (service: EventService) => {
        const isScenario = service.isScenarioEvent(nullProductsEvent);
        expect(isScenario).toBeFalsy();
      }
    ));
  });
});
