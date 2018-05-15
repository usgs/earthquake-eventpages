import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafComponent } from './oaf/oaf.component';
import { OafPercentPipe } from './oaf-percent.pipe';
import { OafRoutingModule } from './oaf-routing.module';
import { OafService } from './oaf.service';
import { RoundDownPipe } from './round-down.pipe';
import { RoundUpPipe } from './round-up.pipe';


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
    CommentaryComponent,
    ForecastComponent,
    ModelComponent,
    OafComponent,
    OafPercentPipe,
    RoundDownPipe,
    RoundUpPipe
  ],
  providers: [
    OafService
  ]
})
export class OafModule { }
