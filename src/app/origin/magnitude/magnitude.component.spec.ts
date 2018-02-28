import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeComponent } from './magnitude.component';
import { MatIconModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';
import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';
import { of } from 'rxjs/observable/of';
import { QuakemlService } from '../../quakeml.service';
import { Quakeml } from '../../quakeml';
import { EVENT_UU60268292 } from '../../quakeml-testdata-uu60268292';
import { xmlToJson } from '../../xml-to-json';
import { EVENT_NC72923380 } from '../../quakeml-testdata-nc72923380';


describe('MagnitudeComponent', () => {
  let component: MagnitudeComponent;
  let fixture: ComponentFixture<MagnitudeComponent>;
  let contributorService;
  let eventService;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const quakemlServiceStub = {
      getQuakeml: jasmine.createSpy('quakemlService::get'),
      quakeml$: of(null)
    };

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatIconModule
      ],
      declarations: [
        MagnitudeComponent,
        MockComponent({selector: 'origin-magnitude-detail', inputs: ['contributions']}),
        MockPipe('contributorList')
      ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub},
        {provide: EventService, useValue: eventServiceStub},
        {provide: QuakemlService, useValue: quakemlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contributorService = fixture.debugElement.injector.get(ContributorService);
    eventService = fixture.debugElement.injector.get(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onQuakeml', () => {
    it('parses magnitudes', () => {
      const quakeml = new Quakeml(xmlToJson(EVENT_UU60268292));
      component.onQuakeml(quakeml);
      expect(component.magnitudes.length).toEqual(2);

      const mag = component.magnitudes[0];
      expect(mag.isPreferred).toBeTruthy();
      expect(mag.magnitude).toEqual('2.58');
      expect(mag.magnitudeError).toEqual('.144');
      expect(mag.stationCount).toEqual('4');
      expect(mag.source).toEqual('UU');
      expect(mag.contributions.length).toEqual(14);

      const contribution = mag.contributions[1];
      expect(contribution).toEqual({
        amplitude: '0.00121916066855192 m',
        amplitudeID: 'quakeml:uu.anss.org/Amp/UU/1005564',
        channel: 'US LKWY BH2 00',
        magnitude: '2.4',
        period: null,
        residual: '-0.18',
        stationMagnitudeID: 'quakeml:uu.anss.org/AssocAmM/UU/1005564',
        status: 'manual',
        type: 'ML',
        unit: null,
        weight: '1'
      });
    });

    it('parses periods', () => {
      const quakeml = new Quakeml(xmlToJson(EVENT_NC72923380));
      const event = quakeml.events[0];
      component.onQuakeml(quakeml);
      expect(component.magnitudes.length).toEqual(3);

      const mag = component.magnitudes[1];
      expect(mag.type).toEqual('Md');
      expect(mag.magnitude).toEqual('4.77');

      const contribution = mag.contributions[0];
      expect(contribution).toEqual({
        amplitude: null,
        amplitudeID: 'quakeml:nc.anss.org/Coda/NC/87482009',
        channel: 'NC HFE EHZ 02',
        magnitude: '4.61',
        period: '202.24 s',
        residual: '-0.16',
        stationMagnitudeID: 'quakeml:nc.anss.org/AssocCoM/NC/87482009',
        status: 'automatic',
        type: 'MD',
        unit: null,
        weight: '0.5'
      });
      // verify period value was from genericAmplitude, and not period
      const amplitude = event.amplitudes[contribution.amplitudeID];
      expect(amplitude.genericAmplitude.value).toEqual('202.24');
      expect(amplitude.period).not.toBeTruthy();
      expect(amplitude.unit).toEqual('s');
    });

    it('sorts preferred first', () => {
      const quakeml = new Quakeml(xmlToJson(EVENT_UU60268292));
      const event = quakeml.events[0];
      spyOn(component, 'parseMagnitude').and.returnValues(
        {id: 'a', isPreferred: false},
        {id: 'b', isPreferred: true},
        {id: 'c', isPreferred: false}
      );
      // enough to force 3 calls to parseMagnitude
      event.magnitudes = [{}, {}, {}];

      component.onQuakeml(quakeml);
      expect(component.magnitudes.length).toEqual(3);
      expect(component.magnitudes).toEqual([
        {id: 'b', isPreferred: true},
        {id: 'a', isPreferred: false},
        {id: 'c', isPreferred: false}
      ]);
    });
  });

  describe('parseContribution', () => {
    it('handles empty contributions', () => {
      expect(() => {
        component.parseContribution({}, {
          stationMagnitudes: {},
          amplitudes: {}
        });
      }).not.toThrowError();
    });

    it('uses period values', () => {
      const parsed = component.parseContribution(
          {
            stationMagnitudeID: 'stationMagnitudeID'
          },
          {
            amplitudes: {
              amplitudeID: {
                period: {
                  value: '123.4'
                }
              }
            },
            stationMagnitudes: {
              stationMagnitudeID: {
                amplitudeID: 'amplitudeID'
              }
            }
          });
      expect(parsed.period).toEqual('123.4 s');
    });

    it('only adds amplitude units when set', () => {
      const parsed = component.parseContribution(
          {
            stationMagnitudeID: 'stationMagnitudeID'
          },
          {
            amplitudes: {
              amplitudeID: {
                genericAmplitude: {
                  value: '123.5'
                }
              }
            },
            stationMagnitudes: {
              stationMagnitudeID: {
                amplitudeID: 'amplitudeID'
              }
            }
          });
      expect(parsed.amplitude).toEqual('123.5');
    });
  });

  describe('parseMagnitude', () => {
    it('uses event creationInfo when magnitude creationInfo not set', () => {
      const parsed = component.parseMagnitude(
          {},
          {
            creationInfo: {
              agencyID: 'event agency'
            }
          });
      expect(parsed.source).toEqual('event agency');
    });

    it('parses empty objects', () => {
      expect(() => {
        component.parseMagnitude({}, {});
      }).not.toThrowError();
    });
  });

});
