import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { EventPageComponent } from './event-page.component';

import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';

describe('EventPageComponent', () => {
  let fixture: ComponentFixture<EventPageComponent>,
      component: EventPageComponent,
      contributorService,
      eventService;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent')
    };

    TestBed.configureTestingModule({
      declarations: [
        EventPageComponent,

        MockComponent({selector: 'event-page-header', inputs: ['event']}),
        MockComponent({selector: 'event-page-footer', inputs: ['event', 'contributors']})
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub},
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(EventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contributorService = fixture.debugElement.injector.get(ContributorService);
    eventService = fixture.debugElement.injector.get(EventService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
