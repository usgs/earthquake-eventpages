import { AppPage } from '../app.po';

describe('ShakeMap Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display ShakeMap title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/shakemap/intensity`);
    expect(page.getPageSectionTitle()).toEqual('ShakeMap');
  });
});
