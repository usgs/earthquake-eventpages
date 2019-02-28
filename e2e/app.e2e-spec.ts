import { AppPage } from './app.po';

const EVENT_ID = 'us1000chhc';

describe('earthquake-eventpages App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display unknown event title', () => {
    page.navigateTo();
    expect(page.getUnknownPageHeaderTitle()).toEqual('Unknown Event');
  });

  it('should display actual event title', () => {
    // mock response for event data to e2e/data/us1000chhc.geojson
    // browser.ngApimock.selectScenario('eventService', 'us1000chhc');

    page.navigateTo(`/${EVENT_ID}`);
    expect(page.getMainPageHeaderTitle()).toEqual(
      'M 6.4 - 18km NNE of Hualian, Taiwan'
    );
  });

  it('should display DYFI title', () => {
    page.navigateTo(`${EVENT_ID}/dyfi/intensity`);
    expect(page.getPageSectionTitle()).toEqual('Did You Feel It?');
  });

  it('should display ShakeMap title', () => {
    page.navigateTo(`${EVENT_ID}/shakemap/intensity`);
    expect(page.getPageSectionTitle()).toEqual('ShakeMap');
  });

  it('should display PAGER title', () => {
    page.navigateTo(`${EVENT_ID}/pager`);
    expect(page.getPageSectionTitle()).toEqual('PAGER');
  });

  it('should display Ground Failure title', () => {
    page.navigateTo(`${EVENT_ID}/ground-failure`);
    expect(page.getPageSectionTitle()).toEqual('Ground Failure');
  });

  it('should display Origin title', () => {
    page.navigateTo(`${EVENT_ID}/origin`);
    expect(page.getPageSectionTitle()).toEqual('Origin');
  });

  it('should display Moment Tensor title', () => {
    page.navigateTo(`${EVENT_ID}/moment-tensor`);
    expect(page.getPageSectionTitle()).toEqual('Moment Tensor');
  });

  it('should display Finite Fault title', () => {
    page.navigateTo(`${EVENT_ID}/finite-fault`);
    expect(page.getPageSectionTitle()).toEqual('Finite Fault');
  });

  it('should display Waveforms title', () => {
    page.navigateTo(`${EVENT_ID}/waveforms`);
    expect(page.getPageSectionTitle()).toEqual('Waveforms');
  });

  it('loads other page', () => {
    page.navigateTo('/us2000jlfv');
    expect(page.getMainPageHeaderTitle()).toEqual(
      'M 7.5 - 115km ESE of Palora, Ecuador'
    );
  });
});
