import {TestBed, inject, ComponentFixture, async} from '@angular/core/testing';

import {EventService} from '../core/event.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WaveformsComponent} from './waveforms/waveforms.component';
import { WaveformService } from './waveform.service';


describe('WaveformService', () => {
  let component: WaveformsComponent;
  let fixture: ComponentFixture<WaveformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        WaveformService,
        EventService,
        HttpClient
      ],
      declarations: [
        WaveformsComponent
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

  it('should be created', inject([WaveformService], (service: WaveformService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse data correctly', async(inject([WaveformService], (service: WaveformService) => {
    let data;

    data = '#EventID | Time | Latitude | Longitude | Depth/km | Author |' +
      ' Catalog | Contributor | ContributorID | MagType | Magnitude | ' +
      'MagAuthor | EventLocationName\n5176028|2016-03-02T12:49:48|-4.9082| ' +
      '94.275|24.0|US|NEIC PDE|NEIC COMCAT|product.xml|MWW|7.8|US|' +
      'SOUTHWEST OF SUMATERA, INDONESIA';

    expect(service.parseIrisEventId(data)).toBe('5176028');
  })));

});
