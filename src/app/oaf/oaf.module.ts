import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';

import { OafRoutingModule } from './oaf-routing.module';

import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafComponent } from './oaf/oaf.component';



@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    ProductPageModule,

    OafRoutingModule
  ],
  declarations: [
    OafComponent,
    CommentaryComponent,
    ForecastComponent,
    ModelComponent
  ]
})
export class OafModule { }
