import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { ShakeAlertService } from './shake-alert.service';
import { ShakeAlertComponent } from './shake-alert/shake-alert.component';
import { ShakeAlertMissedComponent } from './shake-alert/shake-alert-missed/shake-alert-missed.component';
import { ShakeAlertPendingComponent } from './shake-alert/shake-alert-pending/shake-alert-pending.component';
import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed/shake-alert-confirmed.component';
import { ShakeAlertDeletedComponent } from './shake-alert-deleted/shake-alert-deleted.component';
import { ShakeAlertNearbyCitiesComponent } from './shake-alert-nearby-cities/shake-alert-nearby-cities.component';
import { ShakeAlertRoutingModule } from './shake-alert-routing.module';

@NgModule({
  declarations: [
    ShakeAlertComponent,
    ShakeAlertConfirmedComponent,
    ShakeAlertDeletedComponent,
    ShakeAlertMissedComponent,
    ShakeAlertNearbyCitiesComponent,
    ShakeAlertPendingComponent
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
