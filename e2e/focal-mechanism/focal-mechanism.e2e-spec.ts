import { AppPage } from '../app.po';

describe('Focal Mechanism Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Focal Mechanism title', () => {
    page.navigateTo(`/${page.EVENT_ID_2}/focal-mechanism`);
    expect(page.getPageSectionTitle()).toEqual('Focal Mechanism');
  });
});
