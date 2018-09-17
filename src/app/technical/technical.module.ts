import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { SharedModule } from '@shared/shared.module';
import { FocalMechanismSummaryComponent } from './focal-mechanism-summary/focal-mechanism-summary.component';
import { MomentTensorSummaryComponent } from './moment-tensor-summary/moment-tensor-summary.component';
import { OriginSummaryComponent } from './origin-summary/origin-summary.component';
import { TechnicalRoutingModule } from './technical-routing.module';
import { TechnicalComponent } from './technical/technical.component';
import { FiniteFaultSummaryComponent } from './finite-fault-summary/finite-fault-summary.component';

@NgModule({
  declarations: [
    TechnicalComponent,
    OriginSummaryComponent,
    MomentTensorSummaryComponent,
    FocalMechanismSummaryComponent,
    FiniteFaultSummaryComponent
  ],
  imports: [CommonModule, MatTableModule, SharedModule, TechnicalRoutingModule]
})
export class TechnicalModule {}
