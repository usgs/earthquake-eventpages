import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { ShakeAlertComponent } from './shake-alert/shake-alert.component';
import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed/shake-alert-confirmed.component';
import { ShakeAlertMapComponent } from './shake-alert-map/shake-alert-map.component';
import { ShakeAlertMissedComponent } from './shake-alert-missed/shake-alert-missed.component';
import { ShakeAlertNearbyCitiesComponent } from './shake-alert-nearby-cities/shake-alert-nearby-cities.component';
import { ShakeAlertPendingComponent } from './shake-alert-pending/shake-alert-pending.component';
import { ShakeAlertRoutingModule } from './shake-alert-routing.module';
import { ShakeAlertSummaryReportComponent } from './shake-alert-summary-report/shake-alert-summary-report.component';
import { ShakeAlertService } from './shake-alert.service';

@NgModule({
  declarations: [
    ShakeAlertComponent,
    ShakeAlertConfirmedComponent,
    ShakeAlertMissedComponent,
    ShakeAlertNearbyCitiesComponent,
    ShakeAlertPendingComponent,
    ShakeAlertSummaryReportComponent,
    ShakeAlertMapComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    MatTableModule,
    ProductPageModule,
    RouterModule,
    ShakeAlertRoutingModule,
    SharedModule
  ],
  providers: [ShakeAlertService]
})
export class ShakeAlertModule {}
