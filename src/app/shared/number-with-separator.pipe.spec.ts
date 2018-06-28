import { NumberWithSeparatorPipe } from './number-with-separator.pipe';

describe('NumberWithSeparatorPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberWithSeparatorPipe();
    expect(pipe).toBeTruthy();
  });
});
