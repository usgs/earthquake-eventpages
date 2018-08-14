import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { EventPageComponent } from './event-page.component';

describe('EventPageComponent', () => {
  let fixture: ComponentFixture<EventPageComponent>,
    component: EventPageComponent;

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

        MockComponent({
          inputs: ['event'],
          selector: 'event-page-header'
        }),
        MockComponent({
          inputs: ['event', 'contributors'],
          selector: 'event-page-footer'
        }),
        MockComponent({
          inputs: ['event'],
          selector: 'event-page-navigation'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-text-product'
        }),

        MockComponent({ selector: 'app-hazdev-template' }),
        MockComponent({ selector: 'app-navigation-group' }),

        MockComponent({
          inputs: ['display', 'navRouterLink'],
          selector: 'app-navigation-item'
        }),

        MockComponent({ selector: 'mat-nav-list' })
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ContributorService, useValue: contributorServiceStub },
        { provide: EventService, useValue: eventServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
