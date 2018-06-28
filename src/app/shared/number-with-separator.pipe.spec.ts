import { NumberWithSeparatorPipe } from './number-with-separator.pipe';

describe('NumberWithSeparatorPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberWithSeparatorPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    let pipe;

    beforeEach(() => {
      pipe = new NumberWithSeparatorPipe();
    });

    it('deals with bad input', () => {
      expect(pipe.transform()).toEqual('');
      expect(pipe.transform(null)).toEqual('');
    });

    it('deals with good input', () => {
      expect(pipe.transform(0)).toEqual('0');
      expect(pipe.transform(0.0)).toEqual('0');
      expect(pipe.transform(0.1)).toEqual('0.1');

      expect(pipe.transform(3.14159)).toEqual('3.14159');
      expect(pipe.transform(9)).toEqual('9');
      expect(pipe.transform(999)).toEqual('999');
      expect(pipe.transform(123456789)).toEqual('123,456,789');

      expect(pipe.transform(-3.14159)).toEqual('-3.14159');
      expect(pipe.transform(-9)).toEqual('-9');
      expect(pipe.transform(-999)).toEqual('-999');
      expect(pipe.transform(-123456789)).toEqual('-123,456,789');


      // Note : Try other localizations, however many locales use spaces
      //        for either the separator or decimal value and these are
      //        sometimes returned as &nbsp; These values render properly
      //        from pipes, but are difficult to test.
      expect(pipe.transform(-123456789.2127, 'es'))
          .toBe('-123.456.789,2127');
    });
  });
});
