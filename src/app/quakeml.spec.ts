import { Quakeml } from './quakeml';
import { xmlToJson } from './xml-to-json';


describe('Quakeml', () => {

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

  it('parses', () => {
    const parsed = new Quakeml(xmlToJson(QUAKEML_XML));

    expect(parsed.publicID).toEqual('quakeml:uu.anss.org/Event/UU/60268292#151873355837');
    expect(parsed.creationInfo).toEqual({
      agencyID: 'UU',
      creationTime: '2018-02-15T22:25:58.370Z'
    });
    expect(parsed.events.length).toEqual(1);

    const parsedEvent = parsed.events[0];
    expect(parsedEvent.publicID).toEqual('quakeml:uu.anss.org/Event/UU/60268292');
    expect(parsedEvent.preferredMagnitudeID).toEqual('quakeml:uu.anss.org/Netmag/UU/295364');
    expect(parsedEvent.preferredOriginID).toEqual('quakeml:uu.anss.org/Origin/UU/222529');

    expect(parsedEvent.preferredMagnitude()).toEqual(parsedEvent.magnitudes[0]);
    expect(parsedEvent.preferredOrigin()).toEqual(parsedEvent.origins[0]);
  });

});
