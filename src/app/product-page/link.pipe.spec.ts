import { LinkPipe } from './link.pipe';

describe('LinkPipe', () => {
  it('create an instance', () => {
    const pipe = new LinkPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns impact', () => {
    const pipe = new LinkPipe();
    const type = pipe.transform('dyfi');
    expect(type).toBe('impact');
  });

  it('returns technical', () => {
    const pipe = new LinkPipe();
    const type = pipe.transform('origin');
    expect(type).toBe('technical');
  });
});
