import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

import { OafRoutingModule } from './oaf-routing.module';

import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafPercentPipe } from './oaf-percent.pipe';
import { OafComponent } from './oaf/oaf.component';



@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    ProductPageModule,
    SharedModule,

    OafRoutingModule
  ],
  declarations: [
    OafComponent,
    OafPercentPipe,
    CommentaryComponent,
    ForecastComponent,
    ModelComponent
  ],
  exports: [
    OafPercentPipe
  ]
})
export class OafModule { }
