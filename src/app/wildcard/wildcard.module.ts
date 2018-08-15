import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WildcardRoutingModule } from './wildcard-routing.module';
import { WildcardComponent } from './wildcard/wildcard.component';

@NgModule({
  declarations: [WildcardComponent],
  imports: [CommonModule, WildcardRoutingModule]
})
export class WildcardModule {}
