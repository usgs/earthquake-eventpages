import { MockPipe } from './../../mock-pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { ShakeAlertComponent } from './shake-alert.component';
import { ShakeAlertDeletedComponent } from '../shake-alert-deleted/shake-alert-deleted.component';
import { ShakeAlertMissedComponent } from '../shake-alert-missed/shake-alert-missed.component';
import { ShakeAlertPendingComponent } from '../shake-alert-pending/shake-alert-pending.component';
import { ShakeAlertService } from '../shake-alert.service';

describe('ShakeAlertComponent', () => {
  let component: ShakeAlertComponent;
  let fixture: ComponentFixture<ShakeAlertComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    const shakeAlertServiceStub = {
      getSummary: () => null,
      summary$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertComponent,
        ShakeAlertDeletedComponent,
        ShakeAlertMissedComponent,
        ShakeAlertPendingComponent,

        MockComponent({ inputs: ['productType'], selector: 'product-page' }),
        MockComponent({
          inputs: ['summary', 'cities', 'properties'],
          selector: 'shake-alert-confirmed'
        }),
        MockComponent({
          inputs: ['product', 'contentPath'],
          selector: 'shared-text-product'
        }),
        MockComponent({
          inputs: ['event', 'products'],
          selector: 'technical-shake-alert-summary'
        }),

        MockPipe('sharedGetProducts')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: ShakeAlertService, useValue: shakeAlertServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onProduct', () => {
    it('should call getSummary', () => {
      const product = {};
      const spy = spyOn(component.shakeAlertService, 'getSummary');

      component.onProduct(product);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(product);
    });
  });
});
