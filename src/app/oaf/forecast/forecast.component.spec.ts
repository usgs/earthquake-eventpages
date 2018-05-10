import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';

import { ForecastComponent } from './forecast.component';




describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getProduct: jasmine.createSpy('eventService::getProduct')
    };


    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        ForecastComponent,

        MockPipe('oafPercent'),
        MockPipe('sharedDateTime')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
