import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTableModule } from '@angular/material';
import { SharedModule } from '@shared/shared.module';

import { ProductPageModule } from '../product-page/product-page.module';

import { CreateSegmentsPipe } from './create-segments.pipe';
import { FiniteFaultComponent } from './finite-fault/finite-fault.component';
import { FiniteFaultDetailComponent } from './finite-fault/detail/detail.component';
import { FiniteFaultRoutingModule } from './finite-fault-routing.module';
import { ResultTableComponent } from './result-table/result-table.component';

@NgModule({
  declarations: [
    FiniteFaultComponent,
    FiniteFaultDetailComponent,
    ResultTableComponent,
    CreateSegmentsPipe
  ],
  imports: [
    CommonModule,
    FiniteFaultRoutingModule,
    MatButtonModule,
    MatTableModule,
    ProductPageModule,
    SharedModule
  ]
})
export class FiniteFaultModule {}
