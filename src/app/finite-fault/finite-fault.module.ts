import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { SharedModule } from '@shared/shared.module';

import { ProductPageModule } from '../product-page/product-page.module';

import { CreateSegmentsPipe } from './create-segments.pipe';
import { FiniteFaultComponent } from './finite-fault/finite-fault.component';
import { FiniteFaultRoutingModule } from './finite-fault-routing.module';
import { ResultTableComponent } from './result-table/result-table.component';

@NgModule({
  declarations: [
    FiniteFaultComponent,
    ResultTableComponent,
    CreateSegmentsPipe
  ],
  imports: [
    CommonModule,
    FiniteFaultRoutingModule,
    MatTableModule,
    ProductPageModule,
    SharedModule
  ]
})
export class FiniteFaultModule {}
