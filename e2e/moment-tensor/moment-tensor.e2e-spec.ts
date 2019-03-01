import { AppPage } from '../app.po';

describe('MomentTensor Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display MomentTensor title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/moment-tensor`);
    expect(page.getPageSectionTitle()).toEqual('Moment Tensor');
  });
});
