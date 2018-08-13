import { SignificantFigurePipe } from './significant-figure.pipe';

describe('SignificantFigurePipe', () => {
  it('create an instance', () => {
    const pipe = new SignificantFigurePipe();
    expect(pipe).toBeTruthy();
  });
  it('calculates when value is a string', () => {
    const pipe = new SignificantFigurePipe();
    expect(pipe.transform('1234567', 2)).toEqual(1200000);
  });
  it('calculates when value is a string', () => {
    const pipe = new SignificantFigurePipe();
    expect(pipe.transform(1111111, 1)).toEqual(1000000);
    expect(pipe.transform(1111111, 2)).toEqual(1100000);
    expect(pipe.transform(1111111, 3)).toEqual(1110000);
    expect(pipe.transform(1111111, 4)).toEqual(1111000);
    expect(pipe.transform(1111111, 5)).toEqual(1111100);
    expect(pipe.transform(1111111, 6)).toEqual(1111110);
    expect(pipe.transform(1111111, 7)).toEqual(1111111);
  });
});
