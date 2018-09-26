import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    let pipe;

    beforeEach(() => {
      pipe = new StatusPipe();
    });

    it('works when nothing is passed in', () => {
      expect(pipe.transform()).toBe('');
    });

    it('works when product has no status', () => {
      expect(pipe.transform({})).toBe('');
    });

    it('works with a product status', () => {
      expect(pipe.transform({ status: 'status' })).toBe('STATUS');
      expect(pipe.transform({ status: 'STATUS' })).toBe('STATUS');
      expect(pipe.transform({ status: 'sTaTuS' })).toBe('STATUS');

      expect(pipe.transform({ status: 'test' })).toBe('TEST');
    });
  });
});
