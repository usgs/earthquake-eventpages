import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';

import { HazdevTemplateModule } from 'hazdev-template';

import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';
import { EventPageModule } from '../event-page/event-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    EventPageModule,
    HazdevTemplateModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    UnknownEventPageComponent
  ],
  declarations: [UnknownEventPageComponent]
})
export class UnknownEventPageModule { }
