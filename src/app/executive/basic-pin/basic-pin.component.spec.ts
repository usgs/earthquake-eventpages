import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { BasicPinComponent } from './basic-pin.component';


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

        MockComponent({selector: 'shared-product-attribution',
            inputs: ['product']}),
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
