import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
  it('create an instance', () => {
    const pipe = new PercentagePipe();
    expect(pipe).toBeTruthy();
  });

  it('cant be called with a string', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform('0.50')).toEqual('50%');
  });

  it('create an instance', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform(1)).toEqual('>99%');
  });

  it('create an instance', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform(0)).toEqual('<1%');
  });

  it('create an instance', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform(0.50)).toEqual('50%');
  });
});
