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
    model: MODEL,
    forecast: []
  };

  const PRODUCT = {
    contents: {'': { bytes: JSON.stringify(OAF)}}
  };

  const FORECAST = [
    {
      'aboveMainshockMag': {
        'magnitude': 1,
        'probability': 1
      },
      'bins': [
        {
          'magnitude': 1,
          'p95maximun': 1,
          'p95minimum': 1,
          'probability': 1
        },
        {
          'magnitude': 1,
          'p95maximun': 1,
          'p95minimum': 1,
          'probability': 1
        },
        {
          'magnitude': 1,
          'p95maximun': 1,
          'p95minimum': 1,
          'probability': 1
        },
        {
          'magnitude': 1,
          'p95maximun': 1,
          'p95minimum': 1,
          'probability': 1
        }
      ],
      'label': '1 Day',
      'timeEnd': 1,
      'timeStart': 1
    },
    {
      'aboveMainshockMag': {
        'magnitude': 2,
        'probability': 2
      },
      'bins': [
        {
          'magnitude': 2,
          'p95maximun': 2,
          'p95minimum': 2,
          'probability': 2
        },
        {
          'magnitude': 2,
          'p95maximun': 2,
          'p95minimum': 2,
          'probability': 2
        },
        {
          'magnitude': 2,
          'p95maximun': 2,
          'p95minimum': 2,
          'probability': 2
        },
        {
          'magnitude': 2,
          'p95maximun': 2,
          'p95minimum': 2,
          'probability': 2
        }
      ],
      'label': '1 Week',
      'timeEnd': 2,
      'timeStart': 2
    },
    {
      'aboveMainshockMag': {
        'magnitude': 3,
        'probability': 3
      },
      'bins': [
        {
          'magnitude': 3,
          'p95maximun': 3,
          'p95minimum': 3,
          'probability': 3
        },
        {
          'magnitude': 3,
          'p95maximun': 3,
          'p95minimum': 3,
          'probability': 3
        },
        {
          'magnitude': 3,
          'p95maximun': 3,
          'p95minimum': 3,
          'probability': 3
        },
        {
          'magnitude': 3,
          'p95maximun': 3,
          'p95minimum': 3,
          'probability': 3
        }
      ],
      'label': '1 Month',
      'timeEnd': 3,
      'timeStart': 3
    },
    {
      'aboveMainshockMag': {
        'magnitude': 4,
        'probability': 4
      },
      'bins': [
        {
          'magnitude': 4,
          'p95maximun': 4,
          'p95minimum': 4,
          'probability': 4
        },
        {
          'magnitude': 4,
          'p95maximun': 4,
          'p95minimum': 4,
          'probability': 4
        },
        {
          'magnitude': 4,
          'p95maximun': 4,
          'p95minimum': 4,
          'probability': 4
        },
        {
          'magnitude': 4,
          'p95maximun': 4,
          'p95minimum': 4,
          'probability': 4
        }
      ],
      'label': '1 Year',
      'timeEnd': 4,
      'timeStart': 4
    }
  ];

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
    const parseForecast = spyOn(service, 'parseForecast').and.callThrough();

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

    subscription.add(service.forecast$.subscribe((value) => {
      if (triggered) {
        expect(value).not.toEqual(null);
        expect(parseForecast).toHaveBeenCalledWith(OAF.forecast);
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

  describe('parseForecast', () => {
    const testForecast = {
      'columnIds': [
        'magnitude',
        '1_Day',
        '1_Week',
        '1_Month',
        '1_Year'
      ],
      'columns': [
        {
          'id': '1_Day',
          'label': '1 Day',
          'timeStart': 1,
          'timeEnd': 1
        },
        {
          'id': '1_Week',
          'label': '1 Week',
          'timeStart': 2,
          'timeEnd': 2
        },
        {
          'id': '1_Month',
          'label': '1 Month',
          'timeStart': 3,
          'timeEnd': 3
        },
        {
          'id': '1_Year',
          'label': '1 Year',
          'timeStart': 4,
          'timeEnd': 4
        }
      ],
      'rows': [
        {
          'magnitude': 1,
          'data': {
            '1_Day': {
              'p95minimum': 1,
              'p95maximum': 1,
              'probability': 1,
              'magnitude': 1
            },
            '1_Week': {
              'p95minimum': 2,
              'p95maximum': 2,
              'probability': 2,
              'magnitude': 2
            },
            '1_Month': {
              'p95minimum': 3,
              'p95maximum': 3,
              'probability': 3,
              'magnitude': 3
            },
            '1_Year': {
              'p95minimum': 4,
              'p95maximum': 4,
              'probability': 4,
              'magnitude': 4
            }
          }
        },
        {
          'magnitude': 1,
          'data': {
            '1_Day': {
              'p95minimum': 1,
              'p95maximum': 1,
              'probability': 1,
              'magnitude': 1
            },
            '1_Week': {
              'p95minimum': 2,
              'p95maximum': 2,
              'probability': 2,
              'magnitude': 2
            },
            '1_Month': {
              'p95minimum': 3,
              'p95maximum': 3,
              'probability': 3,
              'magnitude': 3
            },
            '1_Year': {
              'p95minimum': 4,
              'p95maximum': 4,
              'probability': 4,
              'magnitude': 4
            }
          }
        },
        {
          'magnitude': 1,
          'data': {
            '1_Day': {
              'p95minimum': 1,
              'p95maximum': 1,
              'probability': 1,
              'magnitude': 1
            },
            '1_Week': {
              'p95minimum': 2,
              'p95maximum': 2,
              'probability': 2,
              'magnitude': 2
            },
            '1_Month': {
              'p95minimum': 3,
              'p95maximum': 3,
              'probability': 3,
              'magnitude': 3
            },
            '1_Year': {
              'p95minimum': 4,
              'p95maximum': 4,
              'probability': 4,
              'magnitude': 4
            }
          }
        },
        {
          'magnitude': 1,
          'data': {
            '1_Day': {
              'p95minimum': 1,
              'p95maximum': 1,
              'probability': 1,
              'magnitude': 1
            },
            '1_Week': {
              'p95minimum': 2,
              'p95maximum': 2,
              'probability': 2,
              'magnitude': 2
            },
            '1_Month': {
              'p95minimum': 3,
              'p95maximum': 3,
              'probability': 3,
              'magnitude': 3
            },
            '1_Year': {
              'p95minimum': 4,
              'p95maximum': 4,
              'probability': 4,
              'magnitude': 4
            }
          }
        }
      ]
    };

    fit('parses forecast correctly', inject([OafService], (service: OafService) => {
      console.log(service.parseForecast(FORECAST));
      expect(service.parseForecast(FORECAST)).toEqual(testForecast);
    }));
  });
});
