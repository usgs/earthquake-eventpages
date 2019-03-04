import { AppPage } from '../app.po';

describe('Origin Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Origin title', () => {
    page.navigateTo(`${page.EVENT_ID_1}/origin/detail`);
    expect(page.getPageSectionTitle()).toEqual('Origin');
  });
});
