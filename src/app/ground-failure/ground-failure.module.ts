import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { GetBarPositionPipe } from './get-bar-position.pipe';
import { GroundFailureRoutingModule } from './ground-failure-routing.module';
import { GroundFailureComponent } from './ground-failure/ground-failure.component';
import { HazardAlertComponent } from './hazard-alert/hazard-alert.component';
import { PopulationAlertComponent } from './population-alert/population-alert.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MdcIconModule,
    MdcTabModule,
    RouterModule,
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
export class GroundFailureModule {}
