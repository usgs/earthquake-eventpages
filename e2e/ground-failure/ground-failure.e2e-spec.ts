import { AppPage } from '../app.po';

describe('Ground Failure Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Ground Failure title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/ground-failure/summary`);
    expect(page.getPageSectionTitle()).toEqual('Ground Failure');
  });
});
