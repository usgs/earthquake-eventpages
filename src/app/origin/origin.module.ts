import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatExpansionModule,
  MatListModule,
  MatSortModule,
  MatButtonModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { MagnitudeDetailComponent } from './magnitude-detail/magnitude-detail.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';
import { OriginRoutingModule } from './origin-routing.module';
import { OriginComponent } from './origin/origin.component';
import { PhaseComponent } from './phase/phase.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MdcIconModule,
    MdcTabModule,
    ProductPageModule,
    SharedModule,

    OriginRoutingModule
  ],
  declarations: [
    DetailComponent,
    MagnitudeComponent,
    OriginComponent,
    PhaseComponent,
    MagnitudeDetailComponent
  ]
})
export class OriginModule {}
