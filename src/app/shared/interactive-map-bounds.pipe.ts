import { Pipe, PipeTransform } from '@angular/core';
import { ParamMap } from '@angular/router';


/**
 * Returns the interactive map bounds
 */
@Pipe({
  name: 'interactiveMapBounds'
})
export class InteractiveMapBoundsPipe implements PipeTransform {

  transform (params: ParamMap): any {
    if (!params) {
      return null;
    }

    const parsed = [];

    const bounds = params.getAll('bounds');
    bounds.forEach((b) => {
      if (!b) {
        return;
      }
      parsed.push(b.split(',').map((n) => +n));
    });

    if (parsed.length === 0) {
      return null;
    }
    return parsed;
  }

}
