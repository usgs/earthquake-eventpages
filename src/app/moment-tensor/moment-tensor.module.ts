import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '@shared/shared.module';

import { AxesComponent } from './axes/axes.component';
import { InfoComponent } from './info/info.component';
import { MomentTensorRoutingModule } from './moment-tensor-routing.module';
import { MomentTensorComponent } from './moment-tensor/moment-tensor.component';

@NgModule({
  declarations: [MomentTensorComponent, AxesComponent, InfoComponent],
  imports: [
    CommonModule,
    MatTableModule,

    ProductPageModule,
    SharedModule,

    MomentTensorRoutingModule
  ]
})
export class MomentTensorModule {}
