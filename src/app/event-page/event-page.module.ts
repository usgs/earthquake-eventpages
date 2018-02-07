import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EventPageComponent,
    UnknownEventPageComponent
  ],
  exports: [
    EventPageComponent,
    UnknownEventPageComponent
  ]
})
export class EventPageModule { }
