import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';
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

        MockComponent({ selector: 'executive-dyfi-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-dyfi-response-submit-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-finite-fault-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-focal-mechanism-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-ground-failure-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-map-pin', inputs: ['event']}),
        MockComponent({ selector: 'executive-moment-tensor-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-nearby-seismicity-pin', inputs: ['event']}),
        MockComponent({ selector: 'executive-oaf-pin', inputs: ['product', 'title', 'type'] }),
        MockComponent({ selector: 'executive-origin-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-pager-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-region-info-pin', inputs: ['event']}),
        MockComponent({ selector: 'executive-shakemap-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-tsunami-pin'}),
        MockComponent({ selector: 'shared-link-product', inputs: ['product']}),
        MockComponent({ selector: 'shared-text-product', inputs: ['product']}),


        MockPipe('getProduct')
      ],
      providers: [
        { provide: ContributorService, useValue: {} },
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
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
