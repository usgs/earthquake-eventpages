import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatTableModule } from '@angular/material';

import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { QuakemlService } from '@core/quakeml.service';
import { MockPipe } from '../../mock-pipe';
import { Quakeml } from '../../quakeml';
import { toArray } from '../../to-array';
import { xmlToJson } from '../../xml-to-json';

import { PhaseComponent } from './phase.component';


describe('PhaseComponent', () => {

  const QUAKEML_XML = `
  <q:quakeml xmlns="http://quakeml.org/xmlns/bed/1.2"
      xmlns:catalog="http://anss.org/xmlns/catalog/0.1"
      xmlns:anss="http://anss.org/xmlns/event/0.1"
      xmlns:q="http://quakeml.org/xmlns/quakeml/1.2">
  <eventParameters publicID="quakeml:uu.anss.org/Event/UU/60268292#151873355837">
    <event publicID="quakeml:uu.anss.org/Event/UU/60268292"
        catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
      <magnitude publicID="quakeml:uu.anss.org/Netmag/UU/295364">
        <mag>
          <value>2.58</value>
          <uncertainty>0.144</uncertainty>
        </mag>
        <type>Ml</type>
        <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
        <methodID>smi:uu.anss.org/magnitude/RichterMl2</methodID>
        <stationCount>4</stationCount>
        <azimuthalGap>176.3</azimuthalGap>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
          <agencyID>UU</agencyID>
          <creationTime>2018-02-15T22:25:37.000Z</creationTime>
        </creationInfo>
      </magnitude>
      <origin publicID="quakeml:uu.anss.org/Origin/UU/222529"
          catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
        <originUncertainty>
          <horizontalUncertainty>290</horizontalUncertainty>
          <confidenceEllipsoid>
            <semiMajorAxisLength>1752</semiMajorAxisLength>
            <semiMinorAxisLength>528</semiMinorAxisLength>
            <semiIntermediateAxisLength>720</semiIntermediateAxisLength>
            <majorAxisPlunge>79</majorAxisPlunge>
            <majorAxisAzimuth>354</majorAxisAzimuth>
            <majorAxisRotation>17</majorAxisRotation>
          </confidenceEllipsoid>
          <preferredDescription>confidence ellipsoid</preferredDescription>
          <confidenceLevel>95</confidenceLevel>
        </originUncertainty>
        <time>
          <value>2018-02-15T18:41:06.020Z</value>
        </time>
        <longitude>
          <value>-111.007</value>
        </longitude>
        <latitude>
          <value>44.7378333</value>
        </latitude>
        <depth>
          <value>8440</value>
          <uncertainty>720</uncertainty>
        </depth>
        <depthType>from location</depthType>
        <timeFixed>false</timeFixed>
        <epicenterFixed>false</epicenterFixed>
        <methodID>smi:uu.anss.org/origin/HYP2000</methodID>
        <quality>
          <associatedPhaseCount>27</associatedPhaseCount>
          <usedPhaseCount>27</usedPhaseCount>
          <associatedStationCount>21</associatedStationCount>
          <usedStationCount>21</usedStationCount>
          <standardError>0.13</standardError>
          <azimuthalGap>54</azimuthalGap>
          <secondaryAzimuthalGap>376</secondaryAzimuthalGap>
          <maximumDistance>0.5617</maximumDistance>
          <minimumDistance>0.02150</minimumDistance>
          <medianDistance>0.2914</medianDistance>
        </quality>
        <type>hypocenter</type>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>final</evaluationStatus>
        <creationInfo>
          <agencyID>UU</agencyID>
          <creationTime>2018-02-15T22:25:37.000Z</creationTime>
        </creationInfo>
        <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907274">
          <pickID>quakeml:uu.anss.org/Arrival/UU/1907274</pickID>
          <phase>P</phase>
          <azimuth>1.6</azimuth>
          <distance>2.150e-02</distance>
          <timeResidual>-.17</timeResidual>
          <timeCorrection>0</timeCorrection>
          <timeWeight>0.14</timeWeight>
          <takeoffAngle>
            <value>163</value>
          </takeoffAngle>
          <creationInfo>
            <agencyID>UU</agencyID>
            <creationTime>2018-02-15T22:25:37.00</creationTime>
          </creationInfo>
        </arrival>
      </origin>
      <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907274">
        <time>
        <value>2018-02-15T18:41:08.57</value>
        <uncertainty>0.06</uncertainty>
        </time>
        <waveformID networkCode="WY" stationCode="YMC" channelCode="EHZ" locationCode="01" />
        <onset>impulsive</onset>
        <polarity>positive</polarity>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:37.00</creationTime>
        </creationInfo>
      </pick>
      <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907279">
        <time>
        <value>2018-02-15T18:41:09.83</value>
        <uncertainty>0.06</uncertainty>
        </time>
        <waveformID networkCode="WY" stationCode="YGC" channelCode="EHZ" locationCode="01" />
        <onset>impulsive</onset>
        <polarity>positive</polarity>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:37.00</creationTime>
        </creationInfo>
      </pick>
      <preferredOriginID>quakeml:uu.anss.org/Origin/UU/222529</preferredOriginID>
      <preferredMagnitudeID>quakeml:uu.anss.org/Netmag/UU/295364</preferredMagnitudeID>
      <type>earthquake</type>
      <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:38.000Z</creationTime>
        <version>4</version>
      </creationInfo>
    </event>
    <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:58.370Z</creationTime>
    </creationInfo>
  </eventParameters>
  </q:quakeml>
  `;

  let component: PhaseComponent;
  let fixture: ComponentFixture<PhaseComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of({})
    };
    const quakemlServiceStub = {
      getQuakeml: jasmine.createSpy('quakemlService::get'),
      quakeml$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        PhaseComponent,

        MockPipe('sharedNumber')
      ],
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: QuakemlService, useValue: quakemlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDownload', () => {
    it('formats download and opens dialog', () => {
      component.sortedPhases = [
        {
          azimuth: 'test azimuth',
          channel: 'test channel',
          distance: 'test distance',
          phase: 'test phase',
          status: 'test status',
          time: 'test time',
          timeResidual: 'test time residual',
          timeWeight: 'test time weight'
        }
      ];

      const spy = spyOn(component.dialog, 'open').and.returnValue({});
      component.onDownload();

      // dialog opened
      expect(component.dialog.open).toHaveBeenCalled();
      // download formatted
      expect(spy.calls.mostRecent().args[1].data.content).toEqual(
        'Channel\tDistance\tAzimuth\tPhase\tArrival Time\tStatus\tResidual' +
        '\tWeight\ntest channel\ttest distance\ttest azimuth\ttest phase' +
        '\ttest time\ttest status\ttest time residual\ttest time weight'
      );
    });
  });

  describe('onQuakeml', () => {
    it('parses quakeml', () => {
      const quakeml = new Quakeml(xmlToJson(QUAKEML_XML));

      component.onQuakeml(quakeml);

      expect(component.sortedPhases).toEqual([
        {
          arrivalPublicID: 'quakeml:uu.anss.org/AssocArO/UU/1907274',
          azimuth: '1.6',
          channel: 'WY YMC EHZ 01',
          distance: '2.150e-02',
          phase: 'P',
          pickPublicId: 'quakeml:uu.anss.org/Arrival/UU/1907274',
          status: 'manual',
          time: '2018-02-15T18:41:08.570Z',
          timeRelative: 2.550,
          timeResidual: '-.17',
          timeWeight: '0.14'
        }
      ]);
    });

    it('handles bad quakeml', () => {
      const quakeml = new Quakeml(xmlToJson(QUAKEML_XML));

      // add arrival that mis-references pick
      const event = quakeml.events[0];
      event.origins[0].arrival = toArray(event.origins[0].arrival);
      event.origins[0].arrival.push({
        'publicID': 'test public id',
        'pickID': 'no such pick'
      });

      component.onQuakeml(quakeml);
      expect(component.sortedPhases[1]).toEqual({
        arrivalPublicID: 'test public id',
        azimuth: undefined,
        channel: null,
        distance: undefined,
        phase: undefined,
        pickPublicId: undefined,
        status: undefined,
        time: null,
        timeRelative: null,
        timeResidual: undefined,
        timeWeight: undefined
      });
    });
  });

  describe('sortPhases', () => {
    const phases = [
      {
        azimuth: '1',
        channel: 'b',
        distance: '2',
        phase: '3',
        residual: '4',
        status: 'c',
        time: 'd',
        timeResidual: '5',
        timeWeight: '6'
      },
      {
        azimuth: '2',
        channel: 'c',
        distance: '3',
        phase: '4',
        residual: '5',
        status: 'd',
        time: 'e',
        timeResidual: '6',
        timeWeight: '7'
      },
      {
        azimuth: '0',
        channel: 'a',
        distance: '1',
        phase: '2',
        residual: '3',
        status: 'b',
        time: 'c',
        timeResidual: '4',
        timeWeight: '5'
      },
    ];

    it('skips sorting unless sort is specified', () => {
      component.phases = phases;

      component.sortPhases(null);
      expect(component.sortedPhases).toEqual(phases);
      component.sortPhases({active: null, direction: 'asc'});
      expect(component.sortedPhases).toEqual(phases);
      component.sortPhases({active: 'azimuth', direction: ''});
      expect(component.sortedPhases).toEqual(phases);
    });

    it('resets sort to default', () => {
      component.phases = phases;

      // sort
      component.sortPhases({active: 'azimuth', direction: 'asc'});
      expect(component.sortedPhases[0]).toEqual(phases[2]);
      expect(component.sortedPhases[1]).toEqual(phases[0]);
      expect(component.sortedPhases[2]).toEqual(phases[1]);

      // reset
      component.sortPhases(null);
      expect(component.sortedPhases).toEqual(phases);
    });

    it('sorts ascending and descending', () => {
      component.phases = phases;

      // sort asc
      component.sortPhases({active: 'azimuth', direction: 'asc'});
      expect(component.sortedPhases[0]).toEqual(phases[2]);
      expect(component.sortedPhases[1]).toEqual(phases[0]);
      expect(component.sortedPhases[2]).toEqual(phases[1]);

      // sort desc
      component.sortPhases({active: 'azimuth', direction: 'desc'});
      expect(component.sortedPhases[0]).toEqual(phases[1]);
      expect(component.sortedPhases[1]).toEqual(phases[0]);
      expect(component.sortedPhases[2]).toEqual(phases[2]);
    });

    it('sorts for expected columns', () => {
      component.phases = phases;

      // sort order is different for known columns
      component.sortPhases({active: 'azimuth', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'channel', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'distance', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'phase', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'status', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'time', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'timeResidual', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);
      component.sortPhases({active: 'timeWeight', direction: 'asc'});
      expect(component.sortedPhases).not.toEqual(phases);

      // sort order is default for unknown columns
      component.sortPhases({active: 'unknown', direction: 'asc'});
      expect(component.sortedPhases).toEqual(phases);
    });
  });

});
