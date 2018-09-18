import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedProductProperty'
})
export class ProductPropertyPipe implements PipeTransform {
  /**
   * Returns the value of desired property, if exists
   *
   * @param product
   *     The event product
   * @param names
   *     Multiple parameters, desired property name value
   *
   * @return {any}
   *     product.properties['path']
   */
  transform(product: any, ...names: string[]): string {
    if (!product || !product.properties) {
      return null;
    }

    const properties = product.properties;
    let property = null;

    names.some(name => {
      if (properties.hasOwnProperty(name)) {
        property = properties[name];
        return true;
      }
    });

    return property;
  }

}
