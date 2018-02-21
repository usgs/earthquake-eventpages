import { AppPage } from './app.po';

describe('earthquake-eventpages App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display unknown event title', () => {
    page.navigateTo();
    expect(page.getEventPageHeaderTitle()).toEqual('Unknown Event');
  });

  it('should display actual event title', () => {
    // TODO :: Stub this data and mock http so results come back consistent
    page.navigateTo('/us1000chhc');
    expect(page.getEventPageHeaderTitle()).toEqual('M 6.4 - 18km NNE of Hualian, Taiwan');
  });
});
