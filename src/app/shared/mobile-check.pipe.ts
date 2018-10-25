import { WindowRef } from './window-ref-wrapper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileCheck'
})
export class MobileCheckPipe implements PipeTransform {
  globalWindow: Window;

  constructor(public windowRef: WindowRef) {
    this.globalWindow = this.windowRef.nativeWindow;
  }

  transform(): boolean {
    let isMobile = false;
    const regexMatch = `/(Android|webOS|iPhone|iPad|iPod|BlackBerry
|Windows Phone|iemobile|WPDesktop)/i`;

    if (this.globalWindow) {
      const str =
        this.globalWindow.navigator.userAgent ||
        this.globalWindow.navigator.vendor;
      if (str !== null || str !== undefined) {
        isMobile = str.match(regexMatch) !== null;
      }
    }
    return isMobile;
  }
}
