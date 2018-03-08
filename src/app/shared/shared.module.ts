import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule } from '@angular/material';

import { AttributionComponent } from './attribution/attribution.component';
import { BeachballComponent } from './beachball/beachball.component';
import { CoordinatesComponent } from './coordinates/coordinates.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { FeRegionComponent } from './fe-region/fe-region.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { TextProductComponent } from './text-product/text-product.component';
import { UncertainValueComponent } from './uncertain-value/uncertain-value.component';

import { NumberPipe } from './number.pipe';
import { DegreesPipe } from './degrees.pipe';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    AttributionComponent,
    BeachballComponent,
    CoordinatesComponent,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent,

    DegreesPipe,
    NumberPipe
  ],
  exports: [
    AttributionComponent,
    BeachballComponent,
    CoordinatesComponent,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MatIconModule,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent,

    DegreesPipe,
    NumberPipe
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
