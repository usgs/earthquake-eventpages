import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { SharedModule } from '@shared/shared.module';
import { TechnicalRoutingModule } from './technical-routing.module';
import { TechnicalComponent } from './technical/technical.component';

@NgModule({
  declarations: [TechnicalComponent],
  imports: [CommonModule, MatTableModule, SharedModule, TechnicalRoutingModule]
})
export class TechnicalModule {}
