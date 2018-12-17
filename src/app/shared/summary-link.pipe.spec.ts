import { SummaryLinkPipe } from './summary-link.pipe';

describe('SummaryLinkPipe', () => {
  it('create an instance', () => {
    const pipe = new SummaryLinkPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null if no productType or event is given', () => {
    const pipe = new SummaryLinkPipe();
    expect(pipe.transform(null)).toEqual(null);
  });

  it('returns correct object when only one product is found', () => {
    const pipe = new SummaryLinkPipe();
    expect(pipe.transform('origin')).toEqual({
      text: 'Technical Summary',
      url: '/technical'
    });
  });
});
