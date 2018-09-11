import { Pipe, PipeTransform } from '@angular/core';
import { NearbyCitiesService } from './nearby-cities.service';

@Pipe({
  name: 'fetchNearbyCities'
})
export class FetchNearbyCitiesPipe implements PipeTransform {
  constructor(public nearbyCitiesService: NearbyCitiesService) {}

  transform(product: any): any {
    this.nearbyCitiesService.get(product);

    return product;
  }
}
