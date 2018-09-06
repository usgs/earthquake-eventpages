import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HazdevTemplateModule } from 'hazdev-ng-template';

import { EventPageModule } from '../event-page/event-page.module';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';

@NgModule({
  declarations: [UnknownEventPageComponent],
  exports: [UnknownEventPageComponent],
  imports: [
    CommonModule,
    EventPageModule,
    HazdevTemplateModule,
    MatListModule,
    RouterModule
  ]
})
export class UnknownEventPageModule {}
