import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';


import { ExecutiveComponent } from './executive/executive.component';
import { BasicPinComponent } from './basic-pin/basic-pin.component';
import { MomentTensorPinComponent } from './moment-tensor-pin/moment-tensor-pin.component';
import { OriginPinComponent } from './origin-pin/origin-pin.component';
import { RegionInfoPinComponent } from './region-info-pin/region-info-pin.component';

import { EventPageModule } from '../event-page/event-page.module';
import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EventPageModule,
    ProductPageModule,
    SharedModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterModule
  ],
  declarations: [
    ExecutiveComponent,
    BasicPinComponent,
    MomentTensorPinComponent,
    OriginPinComponent,
    RegionInfoPinComponent
  ]
})
export class ExecutiveModule { }
