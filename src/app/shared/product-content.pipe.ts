import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedProductContent'
})
export class ProductContentPipe implements PipeTransform {
  /**
   * Returns the value of desired property, if exists
   *
   * @param product
   *     The event product
   * @param paths
   *     Multiple parameters, desired property name value
   *
   * @return {any}
   *     product.contents['path']
   */
  transform(product: any, ...paths: any[]): any {
    if (!product || !product.contents) {
      return null;
    }

    const contents = product.contents;
    let content = null;

    paths.some(path => {
      if (contents.hasOwnProperty(path)) {
        content = contents[path];
        return true;
      }
    });

    return content;
  }
}
