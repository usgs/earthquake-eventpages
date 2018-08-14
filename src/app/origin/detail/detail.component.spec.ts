import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { DetailComponent } from './detail.component';
import { EventService } from '@core/event.service';
import { FormatterService } from '@core/formatter.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let PRODUCT: any;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct'),
      product$: {
        getValue: () => PRODUCT
      }
    };

    PRODUCT = { phasedata: {} };

    const formatterServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,

        MockComponent({
          inputs: ['value', 'uncertainty', 'uncertaintyUnits'],
          selector: 'shared-uncertain-value'
        }),
        MockComponent({
          inputs: ['latitude', 'longitude'],
          selector: 'shared-coordinates'
        }),
        MockComponent({
          inputs: ['latitude', 'longitude'],
          selector: 'shared-fe-region'
        }),
        MockComponent({
          inputs: ['sourceCode'],
          selector: 'shared-attribution'
        })
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: FormatterService, useValue: formatterServiceStub }
      ]
    }).compileComponents();
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
      expect(component.getProduct()).toEqual({});
    });

    it('properly looks for an origin', () => {
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
