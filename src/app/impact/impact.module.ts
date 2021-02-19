import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '@shared/shared.module';
import { ImpactComponent } from './impact/impact.component';
import { ImpactRoutingModule } from './impact-routing.module';

@NgModule({
  declarations: [ImpactComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    SharedModule,

    ImpactRoutingModule
  ]
})
export class ImpactModule {}
