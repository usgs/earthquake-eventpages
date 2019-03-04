import { AppPage } from '../app.po';

describe('Tell Us Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Tell Us title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/tellus`);
    expect(page.select('h2').getText()).toEqual('Felt Report - Tell Us!');
  });
});
