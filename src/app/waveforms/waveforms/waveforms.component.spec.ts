import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { WaveformService } from '../waveform.service';
import { WaveformsComponent } from './waveforms.component';

describe('WaveformsComponent', () => {
  let component: WaveformsComponent;
  let fixture: ComponentFixture<WaveformsComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [WaveformsComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        WaveformService,
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
