import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeComponent } from './magnitude.component';
import { MatIconModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';
import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';
import { of } from 'rxjs/observable/of';
import { QuakemlService } from '../../quakeml.service';

describe('MagnitudeComponent', () => {
  let component: MagnitudeComponent;
  let fixture: ComponentFixture<MagnitudeComponent>;
  let contributorService;
  let eventService;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const quakemlServiceStub = {
      getQuakeml: jasmine.createSpy('quakemlService::get'),
      quakeml$: of(null)
    };

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatIconModule
      ],
      declarations: [
        MagnitudeComponent,
        MockComponent({selector: 'origin-magnitude-detail', inputs: ['contributions']}),
        MockPipe('contributorList')
      ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub},
        {provide: EventService, useValue: eventServiceStub},
        {provide: QuakemlService, useValue: quakemlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contributorService = fixture.debugElement.injector.get(ContributorService);
    eventService = fixture.debugElement.injector.get(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
