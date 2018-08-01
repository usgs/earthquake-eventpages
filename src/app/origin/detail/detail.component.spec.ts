import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { DetailComponent } from './detail.component';
import { EventService } from '../../core/event.service';
import { FormatterService } from '../../core/formatter.service';
import { Event } from '../../event';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let PRODUCT: any;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct'),
      'product$': {
        getValue: () => PRODUCT
      }
    };

    PRODUCT = {phasedata: {}};

    const formatterServiceStub = {
    };

    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,

        MockComponent({selector: 'shared-uncertain-value',
            inputs: ['value', 'uncertainty', 'uncertaintyUnits']}),
        MockComponent({selector: 'shared-coordinates',
            inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-fe-region',
            inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-attribution',
            inputs: ['sourceCode']})
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

  describe('getProduct', () => {
    it('returns object if not found', () => {
      const event = new Event({});

      expect(component.getProduct()).toEqual({});
    });

    it('properly looks for an origin', () => {
      const event = new Event({});
      const spy = spyOn(component.eventService.product$, 'getValue');

      component.getProduct();
      expect(spy).toHaveBeenCalled();
    });

    it('properly defers to phase-data', () => {
      expect(component.getProduct()).toBe(PRODUCT.phasedata);

      PRODUCT = {};
      expect(component.getProduct()).toBe(PRODUCT);

      PRODUCT = null;
      expect(component.getProduct()).toEqual({});
    });
  });
});
