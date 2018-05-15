import { TestBed, inject } from '@angular/core/testing';

import { OafService } from './oaf.service';

describe('OafService', () => {
  const MODEL = {
    ref: 'modelRef',
    name: 'modelName',
    parameters: {
      paramOne: 'valueOne',
      paramTwo: 'valueTwo'
    }
  };

  const OAF = {
    model: MODEL
  };

  const PRODUCT = {
    contents: {'': { bytes: JSON.stringify(OAF)}}
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OafService]
    });
  });

  it('should be created', inject([OafService], (service: OafService) => {
    expect(service).toBeTruthy();
  }));

  describe('getOaf', () => {
    it('should tick next of null on errors',
        inject([OafService], (service: OafService) => {
      const subscription = service.oaf$.subscribe((value) => {
        expect(value).toBe(null);
      });
      subscription.add(service.model$.subscribe((value) => {
        expect(value).toBe(null);
      }));

      service.getOaf(null);
      service.getOaf('');
      service.getOaf('{"foo": bar}');
      service.getOaf(JSON.stringify({
        contents: {
          '': {
            bytes: '{"foo": bar,}' // <-- Intentional syntax error
          }
        }
      }));

      subscription.unsubscribe();
    }));
  });

  it('should notify with objects on success',
        inject([OafService], (service: OafService) => {
    let triggered = false;

    const parseOafSpy = spyOn(service, 'parseOaf').and.callThrough();
    const parseModelSpy = spyOn(service, 'parseModel').and.callThrough();

    const subscription = service.oaf$.subscribe((value) => {
      if (triggered) {
        expect(value).not.toEqual(null);
        expect(parseOafSpy).toHaveBeenCalledWith(JSON.stringify(OAF));
      }
    });

    subscription.add(service.model$.subscribe((value) => {
      if (triggered) {
        expect(value).not.toEqual(null);
        expect(parseModelSpy).toHaveBeenCalledWith(MODEL);
      }
    }));

    triggered = true;
    service.getOaf(PRODUCT);

    subscription.unsubscribe();
  }));

  describe('parseModel', () => {
    it('parses correctly', inject([OafService], (service: OafService) => {
      expect(service.parseModel(MODEL)).toEqual({
        ref: MODEL.ref,
        name: MODEL.name,
        parameters: {
          keys: Object.keys(MODEL.parameters),
          values: MODEL.parameters
        }
      });
    }));
  });

  describe('parseOaf', () => {
    it('defers to JSON.parse', inject([OafService], (service: OafService) => {
      const jsonSpy = spyOn(JSON, 'parse');
      service.parseOaf('');
      expect(jsonSpy).toHaveBeenCalledWith('');
    }));
  });
});
