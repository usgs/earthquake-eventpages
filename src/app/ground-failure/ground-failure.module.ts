import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about/about.component';
import { GroundFailureComponent } from './ground-failure/ground-failure.component';
import { GroundFailureRoutingModule } from './ground-failure-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { GetBarPositionPipe } from './get-bar-position.pipe';
import { HazardAlertComponent } from './hazard-alert/hazard-alert.component';
import { PopulationAlertComponent } from './population-alert/population-alert.component';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,

    ProductPageModule,
    SharedModule,

    GroundFailureRoutingModule
  ],
  declarations: [
    AboutComponent,
    GroundFailureComponent,
    SummaryComponent,
    AlertBarComponent,
    GetBarPositionPipe,
    HazardAlertComponent,
    PopulationAlertComponent
  ]
})
export class GroundFailureModule { }
