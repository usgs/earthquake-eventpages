import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventService } from './../../core/event.service';
import { ShakeAlertPinComponent } from './shake-alert-pin.component';
import { MockComponent } from 'ng2-mock-component';

describe('ShakeAlertPinComponent', () => {
  let component: ShakeAlertPinComponent;
  let fixture: ComponentFixture<ShakeAlertPinComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        })
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
