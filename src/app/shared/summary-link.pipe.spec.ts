import { SummaryLinkPipe } from './summary-link.pipe';


describe('SummaryLinkPipe', () => {
  it('create an instance', () => {
    const pipe = new SummaryLinkPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null if no productType or event is given', () => {
    const pipe = new SummaryLinkPipe();
    expect(pipe.transform(null, null)).toEqual(null);
  });

  it('returns correct object when only one product is found', () => {
    const product = {
      type: 'origin'
    };

    const event = {
      properties: {
        products: {
          origin: [
            product
          ]
        }
      }
    };

    const pipe = new SummaryLinkPipe();
    expect(pipe.transform('origin', event)).toEqual(
        { url: '/technical', text: 'Back to Technical' });
  });

  it('returns correct object when more than one product is found', () => {
    const product = {
      type: 'origin'
    };

    const event = {
      properties: {
        products: {
          origin: [
            {product},
            {product}
          ]
        }
      }
    };

    const pipe = new SummaryLinkPipe();
    expect(pipe.transform('origin', event)).toEqual(
        { url: '/technical', text: 'View alternative origins (2 total)' });
  });
});
