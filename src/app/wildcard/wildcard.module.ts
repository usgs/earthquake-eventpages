import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WildcardRoutingModule } from './wildcard-routing.module';
import { WildcardComponent } from './wildcard/wildcard.component';


@NgModule({
  imports: [
    CommonModule,
    WildcardRoutingModule
  ],
  declarations: [WildcardComponent]
})
export class WildcardModule { }
