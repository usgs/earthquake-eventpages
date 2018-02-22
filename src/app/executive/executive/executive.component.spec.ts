import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveComponent } from './executive.component';
import { MockComponent } from 'ng2-mock-component';
import { EventService } from '../../event.service';

describe('ExecutiveComponent', () => {
  let component: ExecutiveComponent;
  let fixture: ComponentFixture<ExecutiveComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent')
    };

    TestBed.configureTestingModule({
      declarations: [
        ExecutiveComponent,
        MockComponent({ selector: 'shared-text-product', inputs: ['product']})
      ],
      providers: [
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
