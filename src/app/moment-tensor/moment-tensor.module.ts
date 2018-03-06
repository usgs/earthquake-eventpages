import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { MomentTensorRoutingModule } from './moment-tensor-routing.module';
import { MomentTensorComponent } from './moment-tensor/moment-tensor.component';
import { AxesComponent } from './axes/axes.component';
import { MatTableModule } from '@angular/material';
import { NodalPlanesComponent } from './nodal-planes/nodal-planes.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,

    ProductPageModule,
    SharedModule,

    MomentTensorRoutingModule
  ],
  declarations: [
    MomentTensorComponent,
    AxesComponent,
    NodalPlanesComponent,
    InfoComponent
  ]
})
export class MomentTensorModule { }
