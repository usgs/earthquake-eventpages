import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventPageComponent } from './event-page/event-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule
  ],
  exports: [
    EventPageComponent
  ],
  declarations: [EventPageComponent]
})
export class EventPageModule { }
