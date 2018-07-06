import { OafPercentPipe } from './oaf-percent.pipe';

describe('OafPercentPipe', () => {
  it('create an instance', () => {
    const pipe = new OafPercentPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats numbers correctly', () => {
    const pipe = new OafPercentPipe();

    expect(pipe.transform(.350)).toEqual('35 %');
    expect(pipe.transform(.846)).toEqual('85 %');
    expect(pipe.transform(100)).toEqual('> 99 %');
    expect(pipe.transform(.000000001)).toEqual('< 1 %');
    expect(pipe.transform(0.999999)).toEqual('> 99 %');
  });
});
