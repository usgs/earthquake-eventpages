import { MobileCheckPipe } from './mobile-check.pipe';
import { WindowRef } from './window-ref-wrapper';

describe('MobileCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    expect(pipe).toBeTruthy();
  });

  it('returns false on desktop', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36' +
        '(KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeFalsy();
  });

  it('returns true with simulated mobile useragent "Android"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'Android'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "webOS"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'webOS'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "iPhone"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'iPhone'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "iPad"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'iPad'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "iPod"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'iPod'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "BlackBerry"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'BlackBerry'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "Windows Phone"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'Windows Phone'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "iemobile"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'iemobile'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns true with simulated mobile useragent "WPDesktop"', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'WPDesktop'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeTruthy();
  });

  it('returns false with an unkown useragent', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: 'Unknown'
    });
    const mobile = pipe.transform();
    expect(mobile).toBeFalsy();
  });

  it('returns false with null useragent/vendor properties', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: null
    });
    Object.defineProperty(pipe.globalWindow.navigator, 'vendor', {
      value: null
    });
    const mobile = pipe.transform();
    expect(mobile).toBeFalsy();
  });

  it('returns false with undefined useragent/vendor properties', () => {
    const pipe = new MobileCheckPipe(new WindowRef());
    Object.defineProperty(pipe.globalWindow.navigator, 'userAgent', {
      value: undefined
    });
    Object.defineProperty(pipe.globalWindow.navigator, 'vendor', {
      value: undefined
    });
    const mobile = pipe.transform();
    expect(mobile).toBeFalsy();
  });
});
