import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveComponent } from './executive.component';
import { MockComponent } from 'ng2-mock-component';
import { EventService } from '../../core/event.service';
import { ContributorService } from '../../core/contributor.service';
import { of } from 'rxjs/observable/of';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';

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

        MockComponent({ selector: 'executive-dyfi-response-submit-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-shakemap-pin', inputs: ['event']}),
        MockComponent({ selector: 'executive-focal-mechanism-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-map-pin', inputs: ['event']}),
        MockComponent({ selector: 'executive-moment-tensor-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-origin-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-region-info-pin', inputs: ['event']}),
        MockComponent({ selector: 'shared-link-product', inputs: ['product']}),
        MockComponent({ selector: 'shared-text-product', inputs: ['product']}),

        MockPipe('getProduct')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: ContributorService, useValue: {} }
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
