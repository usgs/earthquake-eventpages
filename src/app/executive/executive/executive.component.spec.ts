import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveComponent } from './executive.component';
import { MockComponent } from 'ng2-mock-component';
import { EventService } from '../../event.service';
import { ContributorService } from '../../contributor.service';

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
        MockComponent({ selector: 'app-origin-pin', inputs: ['event', 'contributors']}),
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
});
