import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { MockPipe } from '../../mock-pipe';

import { OriginPinComponent } from './origin-pin.component';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

describe('OriginPinComponent', () => {
  let component: OriginPinComponent;
  let fixture: ComponentFixture<OriginPinComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        OriginPinComponent,

        MockPipe('contributorList')
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        RouterModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: FormatterService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
