import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { ShakeAlertService } from './shake-alert.service';
import { ShakeAlertComponent } from './shake-alert/shake-alert.component';
import { ShakeAlertMissedComponent } from './shake-alert/shake-alert-missed/shake-alert-missed.component';
import { ShakeAlertPendingComponent } from './shake-alert/shake-alert-pending/shake-alert-pending.component';
import { ShakeAlertRoutingModule } from './shake-alert-routing.module';
import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed/shake-alert-confirmed.component';
import { ShakeAlertDeletedComponent } from './shake-alert-deleted/shake-alert-deleted.component';

@NgModule({
  declarations: [
    ShakeAlertComponent,
    ShakeAlertMissedComponent,
    ShakeAlertPendingComponent,
    ShakeAlertConfirmedComponent,
    ShakeAlertDeletedComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ProductPageModule,
    RouterModule,
    ShakeAlertRoutingModule,
    SharedModule
  ],
  providers: [ShakeAlertService]
})
export class ShakeAlertModule {}
