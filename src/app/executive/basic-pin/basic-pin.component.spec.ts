import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { MockPipe } from '../../mock-pipe';
import { of } from 'rxjs/observable/of';

import { BasicPinComponent } from './basic-pin.component';
import { ContributorService } from '../../contributor.service';
import { Event } from '../../event';
import { EventService } from '../../event.service';

describe('BasicPinComponent', () => {
  let component: BasicPinComponent;
  let fixture: ComponentFixture<BasicPinComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    const contributorServiceStub = {
      contributors$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        BasicPinComponent,

        MockPipe('contributorList')
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: ContributorService, useValue: contributorServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
