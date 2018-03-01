import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalRoutingModule } from './technical-routing.module';

import { TechnicalComponent } from './technical/technical.component';
import { OriginSummaryComponent } from './origin-summary/origin-summary.component';
import { MomentTensorSummaryComponent } from './moment-tensor-summary/moment-tensor-summary.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TechnicalRoutingModule
  ],
  declarations: [
    TechnicalComponent,
    OriginSummaryComponent,
    MomentTensorSummaryComponent
  ]
})


export class TechnicalModule { }
