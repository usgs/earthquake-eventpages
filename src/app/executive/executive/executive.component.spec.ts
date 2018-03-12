import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveComponent } from './executive.component';
import { MockComponent } from 'ng2-mock-component';
import { EventService } from '../../core/event.service';
import { ContributorService } from '../../core/contributor.service';
import { of } from 'rxjs/observable/of';
import { Event } from '../../event';

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

        MockComponent({ selector: 'executive-moment-tensor-pin', inputs: ['product']}),
        MockComponent({ selector: 'executive-origin-pin', inputs: ['event', 'contributors']}),
        MockComponent({ selector: 'executive-region-info-pin', inputs: ['event', 'contributors']}),
        MockComponent({ selector: 'shared-link-product', inputs: ['product']}),
        MockComponent({ selector: 'shared-text-product', inputs: ['product']})
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

  describe('onEvent', () => {
    it('clears moment-tensor when event is falsy', () => {
      component.momentTensor = {};
      component.onEvent(null);
      expect(component.momentTensor).toBeNull();
    });

    it('sets moment-tensor when event is defined', () => {
      const event = new Event({
        properties: {
          products: {
            'moment-tensor': [{id: 'test moment tensor'}]
          }
        }
      });
      component.onEvent(event);
      expect(component.momentTensor.id).toEqual('test moment tensor');
    });
  });
});
