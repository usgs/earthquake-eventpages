import { DistancePipe } from './distance.pipe';

import { FormatterService } from '@core/formatter.service';

describe('DistancePipe', () => {
  const pipe = new DistancePipe(new FormatterService());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null with null input', () => {
    const empty = '-';
    const value = pipe.transform(null, null, empty);
    expect(value).toEqual(empty);
  });

  it('converts kilometers to miles and formats the output', () => {
    const value = pipe.transform(10, 0);
    expect(value).toEqual('10 km (16 mi)');
  });

  it('converts kilometers to miles and formats the output', () => {
    const value = pipe.transform(10, 1);
    expect(value).toEqual('10.0 km (16.1 mi)');
  });
});
