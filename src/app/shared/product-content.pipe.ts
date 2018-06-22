import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedProductContent'
})
export class ProductContentPipe implements PipeTransform {

  transform(product: any, ...paths: any[]): any {
    if (!product || !product.contents) {
      return null;
    }

    const contents = product.contents;
    let content = null;

    paths.some((path) => {
      if (contents.hasOwnProperty(path)) {
        content = contents[path];
        return true;
      }
    });

    return content;
  }

}
