import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

import { SharedModule } from '@shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';
import { AboutComponent } from './about/about.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { GetBarPositionPipe } from './get-bar-position.pipe';
import { GroundFailureRoutingModule } from './ground-failure-routing.module';
import { GroundFailureComponent } from './ground-failure/ground-failure.component';
import { HazardAlertComponent } from './hazard-alert/hazard-alert.component';
import { PointSourcePipe } from './point-source.pipe';
import { PopulationAlertComponent } from './population-alert/population-alert.component';
import { SummaryComponent } from './summary/summary.component';
import { SummaryViewComponent } from './summary/summary-view/summary-view.component';
import { GroundFailureTypeComponent } from './summary/ground-failure-type/ground-failure-type.component';
import { PendingPipe } from './pending.pipe';

@NgModule({
  declarations: [
    AboutComponent,
    GroundFailureComponent,
    SummaryComponent,
    AlertBarComponent,
    GetBarPositionPipe,
    HazardAlertComponent,
    PointSourcePipe,
    PopulationAlertComponent,
    SummaryViewComponent,
    GroundFailureTypeComponent,
    PendingPipe
  ],
  imports: [
    CommonModule,
    GroundFailureRoutingModule,
    MatButtonModule,
    MdcIconModule,
    MdcTabModule,
    RouterModule,
    SharedModule,
    ProductPageModule
  ]
})
export class GroundFailureModule {}
