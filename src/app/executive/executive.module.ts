import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasicPinComponent } from './basic-pin/basic-pin.component';
import { ExecutiveComponent } from './executive/executive.component';
import { MomentTensorPinComponent } from './moment-tensor-pin/moment-tensor-pin.component';
import { OriginPinComponent } from './origin-pin/origin-pin.component';
import { RegionInfoPinComponent } from './region-info-pin/region-info-pin.component';

import { EventPageModule } from '../event-page/event-page.module';
import { FocalMechanismPinComponent } from './focal-mechanism-pin/focal-mechanism-pin.component';
import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EventPageModule,
    ProductPageModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    ExecutiveComponent,
    BasicPinComponent,
    MomentTensorPinComponent,
    OriginPinComponent,
    RegionInfoPinComponent,
    FocalMechanismPinComponent
  ]
})
export class ExecutiveModule { }
