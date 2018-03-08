import { DegreesPipe } from './degrees.pipe';

describe('DegreesPipe', () => {
  let formatter,
      pipe;

  beforeEach(() => {
    formatter = {
      empty: 'default empty',
      number: jasmine.createSpy('formatter::dateTime')
    };
    pipe = new DegreesPipe(formatter);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });


  it('calls formatterService', () => {
    pipe.transform('value', 'decimals', 'units', 'empty');
    expect(formatter.number).toHaveBeenCalledWith('value', 'decimals', 'empty', 'units');
  });

  it('can be called without optional arguments', () => {
    pipe.transform('value');
    expect(formatter.number).toHaveBeenCalledWith('value', 0, formatter.empty, '°');
  });

});
