import { AppPage } from './app.po';

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

    page.navigateTo('/us1000chhc');
    expect(page.getEventPageHeaderTitle()).toEqual(
      'M 6.4 - 18km NNE of Hualian, Taiwan'
    );
  });
});
