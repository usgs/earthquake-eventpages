import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { AttributionComponent } from './attribution/attribution.component';
import { BeachballComponent } from './beachball/beachball.component';
import { CoordinatesComponent } from './coordinates/coordinates.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { FeRegionComponent } from './fe-region/fe-region.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { MmiComponent } from './mmi/mmi.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { TextProductComponent } from './text-product/text-product.component';
import { UncertainValueComponent } from './uncertain-value/uncertain-value.component';

import { NumberPipe } from './number.pipe';
import { DegreesPipe } from './degrees.pipe';
import { BubbleComponent } from './bubble/bubble.component';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    AttributionComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DegreesPipe,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MmiComponent,
    NumberPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent
  ],
  exports: [
    AttributionComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MatIconModule,
    MmiComponent,
    NumberPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent,
    DegreesPipe
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
