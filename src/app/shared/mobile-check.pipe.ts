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

    if (this.globalWindow) {
      try {
        const str =
          this.globalWindow.navigator.userAgent ||
          this.globalWindow.navigator.vendor;
        isMobile =
          str.match(
            /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|iemobile|WPDesktop)/i
          ) !== null;
      } catch (e) {
        console.log('error in try catch');
        return false;
      }
    }
    return isMobile;
  }
}
