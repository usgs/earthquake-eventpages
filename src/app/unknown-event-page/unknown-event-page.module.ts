import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';

import { HazdevTemplateModule } from 'hazdev-template';

import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,

    HazdevTemplateModule
  ],
  exports: [
    UnknownEventPageComponent
  ],
  declarations: [UnknownEventPageComponent]
})
export class UnknownEventPageModule { }
