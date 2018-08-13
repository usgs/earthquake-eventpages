import { RoundDownPipe } from './round-down.pipe';

describe('RoundDownPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundDownPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats numbers correcly', () => {
    const pipe = new RoundDownPipe();

    expect(pipe.transform(1015, 2)).toEqual(1000);
    expect(pipe.transform(0, 2)).toEqual(0);
  });
});
