import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FiniteFaultComponent } from './finite-fault/finite-fault.component';

const finiteFaultRoutes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: FiniteFaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(finiteFaultRoutes)],
  exports: [RouterModule]
})
export class FiniteFaultRoutingModule {}
