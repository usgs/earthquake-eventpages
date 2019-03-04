import { AppPage } from '../app.po';

describe('Finite Fault Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Finite Fault title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/finite-fault`);
    expect(page.getPageSectionTitle()).toEqual('Finite Fault');
  });
});
