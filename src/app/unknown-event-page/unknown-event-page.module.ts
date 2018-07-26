import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { HazdevTemplateModule } from 'hazdev-template';

import { EventPageModule } from '../event-page/event-page.module';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';


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
