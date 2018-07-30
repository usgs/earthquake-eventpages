import { RoundUpPipe } from './round-up.pipe';


describe('RoundUpPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundUpPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats numbers correcly', () => {
    const pipe = new RoundUpPipe();

    expect(pipe.transform(327, 2)).toEqual(330);
    expect(pipe.transform(0, 2)).toEqual(0);
  });
});
