import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { DetailComponent } from './detail.component';
import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

import { Event } from '../../event';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    const formatterServiceStub = {
    };


    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,

        MockComponent({selector: 'shared-uncertain-value', inputs: ['value', 'uncertainty', 'uncertaintyUnits']}),
        MockComponent({selector: 'shared-coordinates', inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-fe-region', inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-attribution', inputs: ['sourceCode']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: FormatterService, useValue: formatterServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCatalogDetail', () => {
    it('short circuits on no eventSource', () => {
      expect(component.getCatalogDetail(null, null)).toBe('&ndash;');
      expect(component.getCatalogDetail(null, 'code')).toBe('&ndash;');

      expect(component.getCatalogDetail('', null)).toBe('&ndash;');
      expect(component.getCatalogDetail('', 'code')).toBe('&ndash;');
    });

    it('returns expected results', () => {
      expect(component.getCatalogDetail('Source', 'Code'))
          .toEqual('SOURCE <small>(sourcecode)</small>');
    });
  });

  describe('getProduct', () => {
    it('returns object if not found', () => {
      const event = new Event({});

      expect(component.getProduct(event)).toEqual({});
    });

    it('properly looks for an origin', () => {
      const event = new Event({});
      const spy = spyOn(event, 'getProduct').and.returnValue({});

      component.getProduct(event);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('origin');
    });

    it('properly defers to phase-data', () => {
      let event = new Event({
        properties: {products: {origin: [{type: 'origin'}]}}
      });
      expect(component.getProduct(event).type).toEqual('origin');

      event = new Event({
        'properties': {
          'products': {
            'origin': [{type: 'origin'}],
            'phase-data': [{type: 'phase-data'}]
           }
         }
      });
      expect(component.getProduct(event).type).toEqual('phase-data');
    });
  });

  describe('hasEventTime', () => {
    it('returns as intended', () => {
      expect(component.hasEventTime({})).toBeFalsy();
      expect(component.hasEventTime({eventtime: null})).toBeFalsy();
      expect(component.hasEventTime({eventtime: 0})).toBeFalsy();

      expect(component.hasEventTime({eventtime: '0'})).toBeTruthy();
    });
  })
});
