import { DegreesPipe } from './degrees.pipe';
import { FormatterService } from '../core/formatter.service';

describe('DegreesPipe', () => {
  let formatter,
      pipe;

  beforeEach(() => {
    formatter = {
      empty: 'default empty',
      number: jasmine.createSpy('formatter::number')
    };
    pipe = new DegreesPipe(formatter);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats correctly', () => {
    formatter.number.and.returnValue(10);
    const deg = pipe.transform(10);

    expect(deg).toEqual('10°');
  });

  it('calls formatterService', () => {
    pipe.transform('value', 'decimals', 'units', 'empty');
    expect(formatter.number).toHaveBeenCalledWith('value', 'decimals', 'empty');
  });

  it('can be called without optional arguments', () => {
    pipe.transform('value');
    expect(formatter.number).toHaveBeenCalledWith('value', 0, formatter.empty);
  });
});
