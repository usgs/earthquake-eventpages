import { Input } from '@angular/core';

import { FeltReport } from '../felt-report';
import * as LANGUAGE_EN from '../form-language/en.json';
import { TellUsText } from '../form-language/tell-us-text';
import { Event } from 'app/event';

export abstract class AbstractForm {
  @Input() event: Event;
  @Input() feltReport = new FeltReport();
  @Input() labels: TellUsText = (LANGUAGE_EN as unknown) as TellUsText;

  get hasEvent(): boolean {
    if (this.event && this.event.id) {
      return true;
    } else {
      return false;
    }
  }
}
