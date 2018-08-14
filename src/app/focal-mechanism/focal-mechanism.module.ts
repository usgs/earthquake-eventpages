import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '@shared/shared.module';
import { AttributionComponent } from './attribution/attribution.component';
import { FocalMechanismRoutingModule } from './focal-mechanism-routing.module';
import { FocalMechanismComponent } from './focal-mechanism/focal-mechanism.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,

    ProductPageModule,
    SharedModule,

    FocalMechanismRoutingModule
  ],
  declarations: [FocalMechanismComponent, AttributionComponent]
})
export class FocalMechanismModule {}
