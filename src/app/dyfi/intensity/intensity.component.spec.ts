import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { IntensityComponent } from './intensity.component';


describe('IntensityComponent', () => {
  let component: IntensityComponent;
  let fixture: ComponentFixture<IntensityComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      declarations: [ IntensityComponent ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
