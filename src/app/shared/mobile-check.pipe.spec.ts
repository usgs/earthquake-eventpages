import { MobileCheckPipe } from './mobile-check.pipe';
import { WindowRef } from './window-ref-wrapper';

fdescribe('MobileCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    expect(pipe).toBeTruthy();
  });

  it('returns false on desktop', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    const mobile = pipe.transform();
    expect(mobile).toBeFalsy();
  });
});
