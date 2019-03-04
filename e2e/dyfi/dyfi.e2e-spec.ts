import { AppPage } from '../app.po';

describe('DYFI Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display DYFI title', () => {
    page.navigateTo(`${page.EVENT_ID_1}/dyfi/intensity`);
    expect(page.getPageSectionTitle()).toEqual('Did You Feel It?');
  });
});
