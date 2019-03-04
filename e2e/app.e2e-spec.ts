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
    page.navigateTo(`/${page.EVENT_ID_1}`);
    expect(page.getMainPageHeaderTitle()).toMatch(/^M \d.\d - \d+km .* of .*$/);
  });
});
