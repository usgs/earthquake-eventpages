import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { ZipComponent } from './zip.component';

describe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      declarations: [ZipComponent],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
