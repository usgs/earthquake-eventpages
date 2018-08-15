import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WaveformService } from './waveform.service';


describe('WaveformService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [WaveformService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([WaveformService],
    (service: WaveformService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should parse data correctly', async(
    inject([WaveformService], (service: WaveformService) => {
      let data;

      data =
      '#EventID | Time | Latitude | Longitude | Depth/km | Author |' +
      'Catalog | Contributor | ContributorID | MagType | Magnitude |' +
      'MagAuthor | EventLocationName\n5176028|2016-03-02T12:49:48|-4.9082|' +
      '94.275|24.0|US|NEIC PDE|NEIC COMCAT|product.xml|MWW|7.8|US|' +
      'SOUTHWEST OF SUMATERA, INDONESIA';

      expect(service.parseIrisEventId(data)).toBe('5176028');
    })
  ));
});
