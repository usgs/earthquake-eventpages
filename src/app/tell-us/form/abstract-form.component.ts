import { Input } from '@angular/core';
import { Event } from 'app/event';
import { FeltReport } from '../felt-report';
import { TellUsText } from '../form-language/tell-us-text';

export abstract class AbstractForm {
  @Input() event: Event;
  @Input() feltReport = new FeltReport();
  @Input() labels: TellUsText;

  get hasEvent(): boolean {
    if (this.event && this.event.id) {
      return true;
    } else {
      return false;
    }
  }
}
