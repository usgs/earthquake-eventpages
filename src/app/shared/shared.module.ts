import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { NgModule, Injector } from '@angular/core';
import { MatButtonModule,
          MatDialogModule,
          MatIconModule,
          MatExpansionModule,
          MatCardModule,
          MatTableModule } from '@angular/material';

import { AttributionComponent } from './attribution/attribution.component';
import { AlertLevelComponent } from './alert-level/alert-level.component';
import { BeachballComponent } from './beachball/beachball.component';
import { ProductContentPipe } from './product-content.pipe';
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
import { DyfiCounterPipe } from './dyfi-counter.pipe';
import { GetProductPipe } from './get-product.pipe';
import { GroundFailureOverlaysPipe } from './ground-failure-overlays.pipe';
import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';
import { InteractiveMapBoundsPipe } from './interactive-map-bounds.pipe';
import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { KeysPipe } from './keys.pipe';
import { RomanPipe } from './roman.pipe';
import { RoundDownPipe } from './round-down.pipe';
import { RoundUpPipe } from './round-up.pipe';
import { ShakemapOverlaysPipe } from './shakemap-overlays.pipe';
import { SignificantFigurePipe } from './significant-figure.pipe';
import { StationFlagComponent } from './station-flag/station-flag.component';
import { NumberWithSeparatorPipe } from './number-with-separator.pipe';


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
    ProductContentPipe,
    CoordinatesComponent,
    DegreesPipe,
    DyfiCounterPipe,
    UnitsPipe,
    LocationPipe,
    DownloadDialogComponent,
    FeRegionComponent,
    LinkProductComponent,
    MapComponent,
    MmiComponent,
    NumberPipe,
    NumberWithSeparatorPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    TextProductComponent,
    UncertainValueComponent,
    NodalPlanesComponent,
    TensorPipe,
    DateTimePipe,
    GetProductPipe,
    GroundFailureOverlaysPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    KeysPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakemapOverlaysPipe,
    SignificantFigurePipe,
    StationComponent,
    StationFlagComponent
  ],
  exports: [
    AttributionComponent,
    AlertLevelComponent,
    BeachballComponent,
    BubbleComponent,
    ProductContentPipe,
    CoordinatesComponent,
    DegreesPipe,
    DyfiCounterPipe,
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
    NumberWithSeparatorPipe,
    ProductAttributionComponent,
    PreferredCheckComponent,
    TextProductComponent,
    UncertainValueComponent,
    TensorPipe,
    DateTimePipe,
    GetProductPipe,
    GroundFailureOverlaysPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    KeysPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakemapOverlaysPipe,
    SignificantFigurePipe,
    StationComponent
  ],
  entryComponents: [
    DownloadDialogComponent,
    StationComponent
  ]
})
export class SharedModule {
  constructor (private injector: Injector) {

    // shakemap-station constructor will be an HTMLElement if it's not
    // registered yet
    const stationConst = document.createElement('shakemap-station').constructor;

    if (stationConst === HTMLElement) {
      // shakemap-station element is not yet registered
      const station = createCustomElement(StationComponent, { injector });
      customElements.define('shakemap-station', station);
    }
  }

  ngDoBootstrap () {}
}
