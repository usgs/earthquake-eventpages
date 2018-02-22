import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalRoutingModule } from './technical-routing.module';

import { TechnicalComponent } from './technical/technical.component';
import { TechnicalOriginSummaryComponent } from './technical-origin-summary/technical-origin-summary.component';
import { TechnicalMomentTensorSummaryComponent } from './technical-moment-tensor-summary/technical-moment-tensor-summary.component';


@NgModule({
  imports: [
    CommonModule,
    TechnicalRoutingModule
  ],
  declarations: [
    TechnicalComponent,
    TechnicalOriginSummaryComponent,
    TechnicalMomentTensorSummaryComponent
  ]
})


export class TechnicalModule { }
