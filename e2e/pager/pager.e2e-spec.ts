import { AppPage } from '../app.po';

describe('PAGER Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display PAGER title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/pager`);
    expect(page.getPageSectionTitle()).toEqual('PAGER');
  });
});
