import { ConvertCharacterPipe } from './convert-character.pipe';

describe('DashCharacterPipe', () => {
  let convertCharPipe: ConvertCharacterPipe;

  beforeEach(() => {
    convertCharPipe = new ConvertCharacterPipe();
  });

  it('create an instance', () => {
    expect(convertCharPipe).toBeTruthy();
  });

  it('returns null value with null input value', () => {
    const char = convertCharPipe.transform(null, ['--', '-'], '-');
    expect(char).toBeNull();
  });

  it('returns "-" character with null input value', () => {
    const char = convertCharPipe.transform(null, [null, '--', '-'], '-');
    expect(char).toEqual('-');
  });

  it('returns "-" character with "--" input value', () => {
    const char = convertCharPipe.transform('--', [null, '--', '-'], '-');
    expect(char).toEqual('-');
  });

  it('returns "-" character with "-" input value', () => {
    const char = convertCharPipe.transform('-', [null, '--', '-'], '-');
    expect(char).toEqual('-');
  });

  it('returns "XYZ" with "-" input value', () => {
    const char = convertCharPipe.transform(
      '-',
      [null, '--', '-', 'XYZ'],
      'XYZ'
    );
    expect(char).toEqual('XYZ');
  });
});
