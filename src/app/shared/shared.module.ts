import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { AlertLevelComponent } from './alert-level/alert-level.component';
import { AttributionComponent } from './attribution/attribution.component';
import { BeachballComponent } from './beachball/beachball.component';
import { BubbleComponent } from './bubble/bubble.component';
import { CoordinatesComponent } from './coordinates/coordinates.component';
import { DateTimePipe } from './date-time.pipe';
import { DegreesPipe } from './degrees.pipe';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { DyfiCounterPipe } from './dyfi-counter.pipe';
import { DyfiOverlaysPipe } from './dyfi-overlays.pipe';
import { DyfiResponsePopupComponent } from './dyfi-response-popup/dyfi-response-popup.component';
import { FeRegionComponent } from './fe-region/fe-region.component';
import { FiniteFaultMapPopupComponent } from './finite-fault-map-popup/finite-fault-map-popup.component';
import { GetProductPipe } from './get-product.pipe';
import { GroundFailureOverlaysPipe } from './ground-failure-overlays.pipe';
import { InteractiveMapBoundsPipe } from './interactive-map-bounds.pipe';
import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { KeysPipe } from './keys.pipe';
import { LinkProductComponent } from './link-product/link-product.component';
import { LocationPipe } from './location.pipe';
import { MapComponent } from './map/map.component';
import { MmiComponent } from './mmi/mmi.component';
import { NearbySeismicityLinkPipe } from './nearby-seismicity-link.pipe';
import { NodalPlanesComponent } from './nodal-planes/nodal-planes.component';
import { NumberWithSeparatorPipe } from './number-with-separator.pipe';
import { NumberPipe } from './number.pipe';
import { OrderByPipe } from './order-by.pipe';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { ProductContentPipe } from './product-content.pipe';
import { ProductPropertyPipe } from './product-property.pipe';
import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';
import { RomanPipe } from './roman.pipe';
import { RoundDownPipe } from './round-down.pipe';
import { RoundUpPipe } from './round-up.pipe';
import { ShakemapOverlaysPipe } from './shakemap-overlays.pipe';
import { SignificantFigurePipe } from './significant-figure.pipe';
import { StationFlagComponent } from './station-flag/station-flag.component';
import { StationComponent } from './station/station.component';
import { SummaryLinkPipe } from './summary-link.pipe';
import { SummaryLinkComponent } from './summary-link/summary-link.component';
import { TensorPipe } from './tensor.pipe';
import { TextProductComponent } from './text-product/text-product.component';
import { UncertainValueComponent } from './uncertain-value/uncertain-value.component';
import { UnitsPipe } from './units.pipe';
import { FiniteFaultOverlaysPipe } from './finite-fault-overlays.pipe';

@NgModule({
  declarations: [
    AlertLevelComponent,
    AttributionComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DateTimePipe,
    DegreesPipe,
    DownloadDialogComponent,
    DyfiCounterPipe,
    DyfiOverlaysPipe,
    DyfiResponsePopupComponent,
    FeRegionComponent,
    FiniteFaultMapPopupComponent,
    FiniteFaultOverlaysPipe,
    GetProductPipe,
    GroundFailureOverlaysPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    KeysPipe,
    LinkProductComponent,
    LocationPipe,
    MapComponent,
    MmiComponent,
    NearbySeismicityLinkPipe,
    NodalPlanesComponent,
    NumberPipe,
    NumberWithSeparatorPipe,
    OrderByPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    ProductContentPipe,
    ProductPropertyPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakemapOverlaysPipe,
    SignificantFigurePipe,
    StationComponent,
    StationFlagComponent,
    SummaryLinkComponent,
    SummaryLinkPipe,
    TensorPipe,
    TextProductComponent,
    UncertainValueComponent,
    UnitsPipe
  ],
  entryComponents: [
    DownloadDialogComponent,
    StationComponent,
    DyfiResponsePopupComponent,
    FiniteFaultMapPopupComponent
  ],
  exports: [
    AlertLevelComponent,
    AttributionComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DateTimePipe,
    DegreesPipe,
    DownloadDialogComponent,
    DyfiCounterPipe,
    FeRegionComponent,
    GetProductPipe,
    GroundFailureOverlaysPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    KeysPipe,
    LinkProductComponent,
    LocationPipe,
    MapComponent,
    MatIconModule,
    MmiComponent,
    NearbySeismicityLinkPipe,
    NodalPlanesComponent,
    NumberPipe,
    NumberWithSeparatorPipe,
    OrderByPipe,
    PreferredCheckComponent,
    ProductAttributionComponent,
    ProductContentPipe,
    ProductPropertyPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakemapOverlaysPipe,
    SignificantFigurePipe,
    StationComponent,
    SummaryLinkComponent,
    SummaryLinkPipe,
    TensorPipe,
    TextProductComponent,
    UncertainValueComponent,
    UnitsPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    RouterModule
  ]
})
export class SharedModule {
  constructor(public injector: Injector) {
    // shakemap-station constructor will be an HTMLElement if it's not
    // registered yet
    const stationConst = document.createElement('shakemap-station').constructor;

    if (stationConst === HTMLElement) {
      // shakemap-station element is not yet registered
      const station = createCustomElement(StationComponent, { injector });
      customElements.define('shakemap-station', station);
    }

    // create dyfi-response-popup
    const dyfiPopupConst = document.createElement('dyfi-response').constructor;

    if (dyfiPopupConst === HTMLElement) {
      // dyfi popup element is not yet registered
      const dyfiPopup = createCustomElement(DyfiResponsePopupComponent, {
        injector
      });
      customElements.define('dyfi-response', dyfiPopup);
    }

    // create finite-fault map popup
    const ffPopupConst = document.createElement('finite-fault-map-popup')
      .constructor;

    if (ffPopupConst === HTMLElement) {
      // finite fault popup is not yet registered
      const ffPopup = createCustomElement(FiniteFaultMapPopupComponent, {
        injector
      });
      customElements.define('finite-fault-map-popup', ffPopup);
    }
  }
}
