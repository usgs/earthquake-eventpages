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

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
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
    OriginPinComponent
  ]
})
export class ExecutiveModule { }
