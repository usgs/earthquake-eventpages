import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EventPageComponent],
  exports: [EventPageComponent]
})
export class EventPageModule { }
