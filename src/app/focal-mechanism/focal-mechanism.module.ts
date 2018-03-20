import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { FocalMechanismRoutingModule } from './focal-mechanism-routing.module';
import { FocalMechanismComponent } from './focal-mechanism/focal-mechanism.component';
import { AttributionComponent } from './attribution/attribution.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,

    ProductPageModule,
    SharedModule,

    FocalMechanismRoutingModule
  ],
  declarations: [
    FocalMechanismComponent,
    AttributionComponent
  ]
})
export class FocalMechanismModule { }
