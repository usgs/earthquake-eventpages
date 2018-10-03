import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { ExecutiveComponent } from './executive.component';

describe('ExecutiveComponent', () => {
  let component: ExecutiveComponent;
  let fixture: ComponentFixture<ExecutiveComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event(null))
    };

    TestBed.configureTestingModule({
      declarations: [
        ExecutiveComponent,

        MockComponent({
          inputs: ['product'],
          selector: 'executive-dyfi-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-dyfi-response-submit-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-finite-fault-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-focal-mechanism-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-ground-failure-pin'
        }),
        MockComponent({
          inputs: ['event'],
          selector: 'executive-map-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-moment-tensor-pin'
        }),
        MockComponent({
          inputs: ['event', 'link'],
          selector: 'executive-nearby-seismicity-pin'
        }),
        MockComponent({
          inputs: ['product', 'title', 'type'],
          selector: 'executive-oaf-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-origin-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-pager-pin'
        }),
        MockComponent({
          inputs: ['event'],
          selector: 'executive-region-info-pin'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'executive-shakemap-pin'
        }),
        MockComponent({ selector: 'executive-tsunami-pin' }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-link-product'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-text-product'
        }),
        MockComponent({
          inputs: ['product', 'expanded'],
          selector: 'product-page-download'
        }),

        MockPipe('getProduct'),
        MockPipe('nearbySeismicityLink')
      ],
      providers: [
        { provide: ContributorService, useValue: {} },
        { provide: EventService, useValue: eventServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
