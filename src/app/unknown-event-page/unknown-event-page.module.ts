import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';

import { HazdevTemplateModule } from 'hazdev-template';

import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';
import { TellUsModule } from '../tell-us/tell-us.module';
import { EventPageModule } from '../event-page/event-page.module';

@NgModule({
  imports: [
    CommonModule,
    EventPageModule,
    HazdevTemplateModule,
    MatListModule,
    TellUsModule
  ],
  exports: [
    UnknownEventPageComponent
  ],
  declarations: [UnknownEventPageComponent]
})
export class UnknownEventPageModule { }
