import { UnitsPipe } from './units.pipe';

describe('UnitsPipe', () => {
  let formatter, pipe;

  beforeEach(() => {
    formatter = {
      empty: 'default empty',
      number: jasmine.createSpy('formatter::number')
    };

    pipe = new UnitsPipe(formatter);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats internal units correctly', () => {
    const units = [
      {
        expected: '',
        units: 'count'
      },
      {
        expected: ' mmi',
        units: 'intensity'
      },
      {
        expected: ' km',
        units: 'km'
      }
    ];

    for (const unit of units) {
      const val = 5;
      const res: string = pipe.transform(val, unit.units);

      expect(res === val.toString() + unit.expected).toBeTruthy();
    }
  });

  it('calls formatterService for degrees', () => {
    pipe.transform('value', 'degrees');
    expect(formatter.number).toHaveBeenCalledWith('value', 0, 'default empty');
  });
});
