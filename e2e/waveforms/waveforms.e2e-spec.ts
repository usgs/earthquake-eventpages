import { AppPage } from '../app.po';

describe('Waveforms Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Waveforms title', () => {
    page.navigateTo(`/${page.EVENT_ID_1}/waveforms`);
    expect(page.select('executive-waveforms > h2').getText()).toEqual(
      'Waveforms'
    );
  });
});
