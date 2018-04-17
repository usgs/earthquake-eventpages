import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatSortModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

import { SharedModule } from '../shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { ShakemapComponent } from './shakemap/shakemap.component';
import { StationListComponent } from './station-list/station-list.component';
import { MetadataComponent } from './metadata/metadata.component';

import { ShakemapRoutingModule } from './shakemap-routing.module';
import { InputComponent } from './metadata/input/input.component';
import { OutputComponent } from './metadata/output/output.component';
import { ProcessingComponent } from './metadata/processing/processing.component';
import { UncertaintyComponent } from './uncertainty/uncertainty.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,

    ProductPageModule,
    SharedModule,

    ShakemapRoutingModule
  ],
  declarations: [
    ShakemapComponent,
    StationListComponent,
    MetadataComponent,
    InputComponent,
    OutputComponent,
    ProcessingComponent,
    UncertaintyComponent,
    MapComponent
  ],
  exports: [
    StationListComponent,
    MetadataComponent,
    UncertaintyComponent
  ]
})
export class ShakemapModule { }
