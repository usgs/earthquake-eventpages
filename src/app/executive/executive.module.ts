import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveComponent } from './executive/executive.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ExecutiveComponent]
})
export class ExecutiveModule { }
