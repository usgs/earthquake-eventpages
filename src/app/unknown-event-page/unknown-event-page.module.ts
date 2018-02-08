import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UnknownEventPageComponent
  ],
  declarations: [UnknownEventPageComponent]
})
export class UnknownEventPageModule { }
