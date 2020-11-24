import { AppPage } from '../app.po';

describe('OAF Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display OAF title', () => {
    page.navigateTo(`/${page.EVENT_ID_3}/oaf/commentary`);
    expect(page.getPageSectionTitle()).toEqual('Aftershock Forecast');
  });
});
