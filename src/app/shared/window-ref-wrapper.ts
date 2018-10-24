import { Injectable } from '@angular/core';

/**
 * This class serves as a wrapper for the global window object so that we don't
 * have to access it directly
 */
function _window(): Window {
  // return global window object
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}
