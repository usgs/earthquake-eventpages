import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventPageModule } from '../event-page/event-page.module';
import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

import { BasicPinComponent } from './basic-pin/basic-pin.component';
import { DyfiResponseSubmitPinComponent } from './dyfi-response-submit-pin/dyfi-response-submit-pin.component';
import { ExecutiveComponent } from './executive/executive.component';
import { FocalMechanismPinComponent } from './focal-mechanism-pin/focal-mechanism-pin.component';
import { GroundFailurePinComponent } from './ground-failure-pin/ground-failure-pin.component';
import { MapPinComponent } from './map-pin/map-pin.component';
import { MomentTensorPinComponent } from './moment-tensor-pin/moment-tensor-pin.component';
import { OriginPinComponent } from './origin-pin/origin-pin.component';
import { PagerPinComponent } from './pager-pin/pager-pin.component';
import { RegionInfoPinComponent } from './region-info-pin/region-info-pin.component';
import { ShakemapPinComponent } from './shakemap-pin/shakemap-pin.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    EventPageModule,
    ProductPageModule,
    SharedModule
  ],
  declarations: [
    BasicPinComponent,
    DyfiResponseSubmitPinComponent,
    ExecutiveComponent,
    FocalMechanismPinComponent,
    GroundFailurePinComponent,
    MapPinComponent,
    MomentTensorPinComponent,
    OriginPinComponent,
    PagerPinComponent,
    RegionInfoPinComponent,
    ShakemapPinComponent
  ]
})
export class ExecutiveModule { }
