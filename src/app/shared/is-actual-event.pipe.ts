import { Pipe, PipeTransform } from '@angular/core';

import { Event } from './../event';
import { ScenarioEvent } from './../scenario-event';

@Pipe({
  name: 'isActualEvent'
})
export class IsActualEventPipe implements PipeTransform {
  transform(event: Event): any {
    return event && !(event instanceof ScenarioEvent);
  }
}
