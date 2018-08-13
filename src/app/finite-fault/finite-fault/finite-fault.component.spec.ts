import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
import { FiniteFaultComponent } from './finite-fault.component';

describe('FiniteFaultComponent', () => {
  let component: FiniteFaultComponent;
  let fixture: ComponentFixture<FiniteFaultComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        FiniteFaultComponent,

        MockComponent({ selector: 'product-page', inputs: ['bin'] }),
        MockComponent({ selector: 'shared-text-product', inputs: ['product'] }),

        MockPipe('sharedDegrees'),
        MockPipe('sharedLocation'),
        MockPipe('sharedNumber'),
        MockPipe('sharedProductContent')
      ],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
