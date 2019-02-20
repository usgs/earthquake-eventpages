import { Input } from '@angular/core';
import { Event } from 'app/event';
import { FeltReport } from '../felt-report';
import * as LANGUAGE_EN from '../form-language/en.json';

export abstract class AbstractForm {
  @Input() event: Event;
  @Input() feltReport = new FeltReport();
  @Input() labels = LANGUAGE_EN;

  get hasEvent(): boolean {
    if (this.event && this.event.id) {
      return true;
    } else {
      return false;
    }
  }
}
