import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatSortModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';

import { ShakemapComponent } from './shakemap/shakemap.component';
import { StationListComponent } from './station-list/station-list.component';
import { MetadataComponent } from './metadata/metadata.component';

import { ShakemapRoutingModule } from './shakemap-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ProductPageModule,

    ShakemapRoutingModule
  ],
  declarations: [ShakemapComponent, StationListComponent, MetadataComponent]
})
export class ShakemapModule { }
