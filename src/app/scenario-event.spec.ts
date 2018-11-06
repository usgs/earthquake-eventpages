import { ScenarioEvent } from './scenario-event';

describe('ScenarioEvent', () => {
  const TEST_EVENT = {
    properties: {
      mag: 10.0,
      mmi: 6.82,
      place: 'Squaw Creek',
      products: {
        'actual-scenario': [
          {
            id: 'urn:usgs-product:us:actual-scenario:bkkdk3009_m4jdk_sw',
            indexid: '3882993',
            indexTime: 19874885888398
          }
        ],
        'origin-scenario': [
          {
            id: 'urn:usgs-product:us:origin-scenario:bssc2014632_m7p03_se',
            indexid: '165981',
            indexTime: 1494946824822,
            type: 'origin-scenario'
          }
        ],
        'shakemap-scenario': [
          {
            id: 'urn:usgs-product:us:shakemap-scenario:bssc2018839_m5peo_se',
            indexid: '174853',
            indexTime: 19873987890234,
            type: 'shakemap-scenario'
          }
        ],
        'super-duper-test-scenario': [
          {
            id: 'urn:usgs-product:us:super-duper-test-scenario:lksjd0039_mmd_3',
            indexid: '3888293',
            inexTime: 19873987890234,
            type: 'super-duper-test-scenario'
          }
        ],
        'test-scenario': [
          {
            id: 'urn:usgs-product:us:test-scenario:bskl230909_m4kkd_sw',
            indexid: '897398',
            indexTime: 19873897987987,
            type: 'test-scenario'
          }
        ],
        testActual: [
          {
            id: 'urn:usgs-product:us:test-scenario:bskl230909_m4kkd_sw',
            indexid: '897398',
            indexTime: 19873897987987,
            type: 'test-actual'
          }
        ]
      }
    }
  };

  it('is defined', () => {
    const event = new ScenarioEvent(TEST_EVENT);
    expect(event).toBeTruthy();
  });

  it('handles null', () => {
    const event = new ScenarioEvent(TEST_EVENT);
    expect(event.geometry).toBeNull();
    expect(event.id).toBeNull();
    expect(event.properties).not.toBeNull();
    expect(event.sources.length).toEqual(0);
  });

  it('changes properties', () => {
    const event = new ScenarioEvent(TEST_EVENT);
    expect(event.properties.products.origin).toBeTruthy();
    expect(event.properties.products.origin[0].type).toEqual('origin');
    expect(event.properties.products['super-duper-test']).toBeTruthy();
    expect(event.properties.products['super-duper-test'][0].type).toEqual(
      'super-duper-test'
    );
  });

  it('handles no -scenario in properties array', () => {
    const event = new ScenarioEvent(TEST_EVENT);
    expect(event.properties.products.testActual[0].type).toEqual('test-actual');
  });

  it('handles no type inside each product type', () => {
    const event = new ScenarioEvent(TEST_EVENT);
    expect(event.properties.products.actual[0].type).toBeUndefined();
    expect(event.properties.products.actual).toBeTruthy();
    expect(event.properties.products.actual[0].indexid).toEqual('3882993');
  });
});
