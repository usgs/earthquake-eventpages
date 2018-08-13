import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { xmlToJson } from '../xml-to-json';
import { PagerXmlService } from './pagerxml.service';

describe('PagerxmlService', () => {
  let httpClient, injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'pager.xml': { url: 'url' }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PagerXmlService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject(
    [PagerXmlService],
    (service: PagerXmlService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('getPagerXml', () => {
    it('handles success', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const response = '';

        const spy = spyOn(service, 'parseResponse').and.returnValue({});
        service.getPagerXml(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush(response);

        expect(spy).toHaveBeenCalled();

        const args = spy.calls.argsFor(0);
        expect(args[0]).toEqual(response);
      }
    ));

    it('handles failure', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        service.getPagerXml(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush('', { status: 500, statusText: 'Error' });

        service.pagerXml$.subscribe(content => {
          expect(content).toEqual(null);
          expect(service.error).toBeTruthy();
        });
      }
    ));

    it('handles parseError', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        spyOn(service, 'parseResponse').and.throwError('test error');

        service.getPagerXml(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush('', { status: 500, statusText: 'Error' });

        service.pagerXml$.subscribe(content => {
          expect(content).toEqual(null);
          expect(service.error).toEqual(new Error('test error'));
        });
      }
    ));

    it('pushes null for bad usage', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        service.getPagerXml(null);
        service.pagerXml$.subscribe(parsed => {
          expect(parsed).toBe(null);
        });
      }
    ));
  });

  describe('parseResponse', () => {
    it('parses pager.xml when response is not null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const response = `<pager><alert></alert></pager>`;

        spyOn(service, '_parseAlerts');
        spyOn(service, '_parseExposures');
        spyOn(service, '_parseCities');
        spyOn(service, '_parseComments');

        service.parseResponse(response);

        expect(service._parseAlerts).toHaveBeenCalled();
        expect(service._parseExposures).toHaveBeenCalled();
        expect(service._parseCities).toHaveBeenCalled();
        expect(service._parseComments).toHaveBeenCalled();
      }
    ));

    it('returns null when response is null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const response = service.parseResponse(null);
        expect(response).toBeNull();
      }
    ));

    it('returns null when response is not pager.xml', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const response = service.parseResponse('<test></test>');
        expect(response).toBeNull();
      }
    ));
  });

  describe('parseAlerts', () => {
    it('parses pager.xml when response is not null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const xml = xmlToJson(`<pager>
          <alert level="green" summary="yes" type="economic" units="USD">
            <bin color="green" max="1" min="0" probability="0.65"/>
            <bin color="yellow" max="10" min="1" probability="0.30"/>
            <bin color="yellow" max="100" min="10" probability="0.04"/>
            <bin color="orange" max="1000" min="100" probability="0.00"/>
            <bin color="red" max="10000" min="1000" probability="0.00"/>
            <bin color="red" max="100000" min="10000" probability="0.00"/>
            <bin color="red" max="10000000" min="100000" probability="0.00"/>
          </alert>
          <alert level="green" summary="no" type="fatality" units="fatalities">
            <bin color="green" max="1" min="0" probability="0.65"/>
            <bin color="yellow" max="10" min="1" probability="0.30"/>
            <bin color="yellow" max="100" min="10" probability="0.04"/>
            <bin color="orange" max="1000" min="100" probability="0.00"/>
            <bin color="red" max="10000" min="1000" probability="0.00"/>
            <bin color="red" max="100000" min="10000" probability="0.00"/>
            <bin color="red" max="10000000" min="100000" probability="0.00"/>
          </alert>
        </pager>`);
        const alerts = service._parseAlerts(xml.pager);
        expect(alerts.economic.bin.length).toEqual(7);
        expect(alerts.fatality.bin.length).toEqual(7);
      }
    ));

    it('returns null when response is null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const alerts = service._parseAlerts(null);
        expect(alerts).toBeNull();
      }
    ));
  });

  describe('parseCities', () => {
    it('parses pager.xml when response is not null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const xml = xmlToJson(`<pager>
          <city iscapital="0" lat="36.3956" lon="-97.8784" mmi="4.1"
              name="Enid" population="49379"/>
          <city iscapital="0" lat="36.2803" lon="-97.8981" mmi="3.6"
              name="Waukomis" population="1286"/>
          <city iscapital="0" lat="36.8070" lon="-97.7337" mmi="3.5"
              name="Medford" population="996"/>
          <city iscapital="0" lat="36.1092" lon="-97.8987" mmi="3.3"
              name="Hennessey" population="2131"/>
          <city iscapital="0" lat="36.6784" lon="-97.3100" mmi="3.2"
              name="Tonkawa" population="3216"/>
          <city iscapital="0" lat="36.5461" lon="-98.2701" mmi="3.2"
              name="Helena" population="1403"/>
        </pager>`);
        const cities = service._parseCities(xml.pager);
        expect(cities.length).toEqual(6);
      }
    ));

    it('returns null when response is null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const cities = service._parseCities(null);
        expect(cities).toBeNull();
      }
    ));
  });

  describe('parseComments', () => {
    it('parses pager.xml when response is not null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const xml = xmlToJson(`<pager>
          <structcomment>
            testing...
          </structcomment>
          <alertcomment>
            testing..
          </alertcomment>
          <impact_comment>
            Red alert for shaking-related fatalities and economic losses.
            High casualties and extensive damage are probable and the disaster
            is likely widespread. Past red alerts have required a national or
            international response.#Estimated economic losses are 0-1% GDP of
            Mexico.
          </impact_comment>
          <secondary_effects>
            testing...
          </secondary_effects>
        </pager>`);
        const spy = spyOn(service, '_parseImpactComments').and.returnValue({});
        const comments = service._parseComments(xml.pager);
        expect(comments.effects).toBeDefined();
        expect(comments.structure).toBeDefined();
        expect(spy).toHaveBeenCalled();
      }
    ));

    it('returns null when response is null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const comments = service._parseComments(null);
        expect(comments).toBeNull();
      }
    ));
  });

  describe('parseImpactComments', () => {
    it('handles both fatality and economic processing of impact comments', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const impact = service._parseImpactComments(
          'testing#with economic comment'
        );
        expect(impact).not.toBeNull();
        expect(impact.economic).toBeDefined();
        expect(impact.fatality).toBeDefined();
      }
    ));
    it('handles a fatality impact comment and empty economic comment', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const impact = service._parseImpactComments('testing#');
        expect(impact).not.toBeNull();
        expect(impact.economic).not.toBeDefined();
        expect(impact.fatality).toBeDefined();
      }
    ));
    it('handles just a fatality impact comment', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const impact = service._parseImpactComments('testing');
        expect(impact).not.toBeNull();
        expect(impact.economic).not.toBeDefined();
        expect(impact.fatality).toBeDefined();
      }
    ));
  });

  describe('parseExposure', () => {
    it('parses pager.xml when response is not null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const xml = xmlToJson(`<pager>
          <exposure dmax="1.5" dmin="0.5" exposure="0" rangeInsideMap="0"/>
          <exposure dmax="2.5" dmin="1.5" exposure="2812127"
              rangeInsideMap="0"/>
          <exposure dmax="3.5" dmin="2.5" exposure="2316974"
              rangeInsideMap="1"/>
          <exposure dmax="4.5" dmin="3.5" exposure="62368" rangeInsideMap="1"/>
          <exposure dmax="5.5" dmin="4.5" exposure="0" rangeInsideMap="1"/>
          <exposure dmax="6.5" dmin="5.5" exposure="0" rangeInsideMap="1"/>
          <exposure dmax="7.5" dmin="6.5" exposure="0" rangeInsideMap="1"/>
          <exposure dmax="8.5" dmin="7.5" exposure="0" rangeInsideMap="1"/>
          <exposure dmax="9.5" dmin="8.5" exposure="0" rangeInsideMap="1"/>
          <exposure dmax="10.5" dmin="9.5" exposure="0" rangeInsideMap="1"/>
        </pager>`);
        const exposures = service._parseExposures(xml.pager);
        expect(exposures.length).toEqual(9);
      }
    ));

    it('returns null when response is null', inject(
      [PagerXmlService],
      (service: PagerXmlService) => {
        const exposures = service._parseExposures(null);
        expect(exposures).toBeNull();
      }
    ));
  });
});
