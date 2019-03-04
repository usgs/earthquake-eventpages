import { AppPage } from '../app.po';

describe('Region Info Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a map', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/region-info`);
    expect(page.select('region-info-display')).not.toBeNull();
  });
});
