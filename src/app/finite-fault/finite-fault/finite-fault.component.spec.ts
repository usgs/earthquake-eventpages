import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng2-mock-component';

import { FiniteFaultComponent } from './finite-fault.component';

import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';

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

        MockComponent({selector: 'product-page', inputs: ['bin']}),

        MockPipe('sharedProductContent')
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
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
