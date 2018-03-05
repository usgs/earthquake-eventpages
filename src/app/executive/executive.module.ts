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
import { OriginPinComponent } from './origin-pin/origin-pin.component';
import { RegionalPinComponent } from './regional-pin/regional-pin.component';

import { EventPageModule } from '../event-page/event-page.module';
import { ProductPageModule } from '../product-page/product-page.module';
import { AppModule as ShakeMapModule } from '../shakemap/app.module';
import { SharedModule } from '../shared/shared.module';
import { ShakemapPinComponent } from './shakemap-pin/shakemap-pin.component';

@NgModule({
  imports: [
    CommonModule,
    EventPageModule,
    ProductPageModule,
    ShakeMapModule,
    SharedModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterModule
  ],
  declarations: [
    ExecutiveComponent,
    OriginPinComponent,
    RegionalPinComponent,
    ShakemapPinComponent
  ]
})
export class ExecutiveModule { }
