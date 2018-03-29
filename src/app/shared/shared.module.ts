import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule,
          MatDialogModule,
          MatIconModule,
          MatExpansionModule,
          MatCardModule,
          MatTableModule } from '@angular/material';
import { AttributionComponent } from './attribution/attribution.component';
import { AlertLevelComponent } from './alert-level/alert-level.component';
import { BeachballComponent } from './beachball/beachball.component';
import { CoordinatesComponent } from './coordinates/coordinates.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { FeRegionComponent } from './fe-region/fe-region.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { MapComponent } from './map/map.component';
import { MmiComponent } from './mmi/mmi.component';
import { NodalPlanesComponent } from './nodal-planes/nodal-planes.component';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { TextProductComponent } from './text-product/text-product.component';
import { UncertainValueComponent } from './uncertain-value/uncertain-value.component';

import { NumberPipe } from './number.pipe';
import { DegreesPipe } from './degrees.pipe';
import { UnitsPipe } from './units.pipe';
import { LocationPipe } from './location.pipe';
import { BubbleComponent } from './bubble/bubble.component';

import { StationComponent } from './station/station.component';
import { TensorPipe } from './tensor.pipe';
import { DateTimePipe } from './date-time.pipe';
import { GetProductPipe } from './get-product.pipe';
import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule
  ],
  declarations: [
    AttributionComponent,
    AlertLevelComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DegreesPipe,
    UnitsPipe,
    LocationPipe,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MapComponent,
    MmiComponent,
    NumberPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent,
    StationComponent,
    NodalPlanesComponent,
    TensorPipe,
    DateTimePipe,
    GetProductPipe,
    RegionInfoOverlaysPipe
  ],
  exports: [
    AttributionComponent,
    AlertLevelComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DegreesPipe,
    UnitsPipe,
    LocationPipe,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MapComponent,
    MatIconModule,
    MmiComponent,
    NodalPlanesComponent,
    NumberPipe,
    ProductAttributionComponent,
    PreferredCheckComponent,
    TextProductComponent,
    UncertainValueComponent,
    StationComponent,
    TensorPipe,
    DateTimePipe,
    GetProductPipe,
    RegionInfoOverlaysPipe
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
