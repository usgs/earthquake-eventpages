import { Event } from './../event';
import { Pipe, PipeTransform } from '@angular/core';
import { ScenarioEvent } from 'app/scenario-event';

@Pipe({
  name: 'isScenarioEvent'
})
export class IsScenarioEventPipe implements PipeTransform {
  transform(event: Event): any {
    return event && event instanceof ScenarioEvent;
  }
}
