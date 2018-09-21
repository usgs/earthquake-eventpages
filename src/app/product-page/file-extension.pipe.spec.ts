import { FileExtensionPipe } from './file-extension.pipe';

describe('FileExtensionPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new FileExtensionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('formats properly', () => {
      const result = pipe.transform('folder/file.extension');
      expect(result).toBe('extension');
    });

    it('handles empty paths', () => {
      const result = pipe.transform('');
      expect(result).toBeNull();
    });
  });
});
