import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointSource'
})
export class PointSourcePipe implements PipeTransform {
  transform(product: any): boolean {
    try {
      return product.properties['rupture-warning'].toUpperCase() !== 'FALSE';
    } catch (e) {
      return false;
    }
  }
}
