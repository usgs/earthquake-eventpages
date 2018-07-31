import { FileSizePipe } from './file-size.pipe';


describe('FileSizePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new FileSizePipe();
  });


  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('formats properly', () => {
      const result = pipe.transform(1536);
      expect(result).toBe('1.5 KB');
    });

    it('formats with precision', () => {
      const result = pipe.transform(1536, 2);
      expect(result).toBe('1.50 KB');
    });
  });
});
