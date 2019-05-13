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
import { DirectionPipe } from './direction.pipe';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { DyfiCounterPipe } from './dyfi-counter.pipe';
import { DyfiOverlaysPipe } from './dyfi-overlays.pipe';
import { DyfiResponsePopupComponent } from './dyfi-response-popup/dyfi-response-popup.component';
import { EventTitlePipe } from './event-title.pipe';
import { FeRegionComponent } from './fe-region/fe-region.component';
import { FileSizePipe } from './file-size.pipe';
import { FiniteFaultMapPopupComponent } from './finite-fault-map-popup/finite-fault-map-popup.component';
import { FiniteFaultOverlaysPipe } from './finite-fault-overlays.pipe';
import { GetContentPipe } from './get-content.pipe';
import { GeoService } from './geo.service';
import { GetMapBoundsPipe } from './get-map-bounds.pipe';
import { GetProductPipe } from './get-product.pipe';
import { GetProductsPipe } from './get-products.pipe';
import { GroundFailureOverlaysPipe } from './ground-failure-overlays.pipe';
import { HasProductPipe } from './has-product.pipe';
import { InteractiveMapBoundsPipe } from './interactive-map-bounds.pipe';
import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { IsActualEventPipe } from './is-actual-event.pipe';
import { IsDeletedEventPipe } from './is-deleted-event.pipe';
import { IsErrorResponsePipe } from './is-error-response.pipe';
import { IsScenarioEventPipe } from './is-scenario-event.pipe';
import { KeysPipe } from './keys.pipe';
import { LinkProductComponent } from './link-product/link-product.component';
import { LocationPipe } from './location.pipe';
import { MapComponent } from './map/map.component';
import { MilesKilometersPipe } from './miles-kilometers.pipe';
import { MmiComponent } from './mmi/mmi.component';
import { MobileCheckPipe } from './mobile-check.pipe';
import { NearbySeismicityLinkPipe } from './nearby-seismicity-link.pipe';
import { NodalPlanesComponent } from './nodal-planes/nodal-planes.component';
import { NumberWithSeparatorPipe } from './number-with-separator.pipe';
import { NumberPipe } from './number.pipe';
import { OrderByPipe } from './order-by.pipe';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { ProductContentPipe } from './product-content.pipe';
import { ProductPropertyPipe } from './product-property.pipe';
import { ProductReviewedPipe } from './product-reviewed.pipe';
import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';
import { RomanPipe } from './roman.pipe';
import { RomanToNumberPipe } from './roman-to-number.pipe';
import { RoundDownPipe } from './round-down.pipe';
import { RoundUpPipe } from './round-up.pipe';
import { ShakeAlertOverlaysPipe } from './shake-alert-map-overlays.pipe';
import { ShakeAlertSummaryComponent } from './shake-alert-summary/shake-alert-summary.component';
import { ShakemapOverlaysPipe } from './shakemap-overlays.pipe';
import { SignificantFigurePipe } from './significant-figure.pipe';
import { StationFlagComponent } from './station-flag/station-flag.component';
import { StationComponent } from './station/station.component';
import { StatusPipe } from './status.pipe';
import { SummaryLinkPipe } from './summary-link.pipe';
import { SummaryLinkComponent } from './summary-link/summary-link.component';
import { TensorPipe } from './tensor.pipe';
import { TextProductComponent } from './text-product/text-product.component';
import { UncertainValueComponent } from './uncertain-value/uncertain-value.component';
import { UnitsPipe } from './units.pipe';
import { WindowRef } from './window-ref-wrapper';
import { DyfiSummaryComponent } from '@shared/dyfi-summary/dyfi-summary.component';
import { PagerSummaryComponent } from '@shared/pager-summary/pager-summary.component';
import { ShakemapSummaryComponent } from '@shared/shakemap-summary/shakemap-summary.component';
import { FiniteFaultSummaryComponent } from '@shared/finite-fault-summary/finite-fault-summary.component';
import { FocalMechanismSummaryComponent } from '@shared/focal-mechanism-summary/focal-mechanism-summary.component';
import { MomentTensorSummaryComponent } from '@shared/moment-tensor-summary/moment-tensor-summary.component';
import { OriginSummaryComponent } from '@shared/origin-summary/origin-summary.component';

@NgModule({
  declarations: [
    AlertLevelComponent,
    AttributionComponent,
    BeachballComponent,
    BubbleComponent,
    CoordinatesComponent,
    DateTimePipe,
    DegreesPipe,
    DirectionPipe,
    DownloadDialogComponent,
    DyfiCounterPipe,
    DyfiOverlaysPipe,
    DyfiResponsePopupComponent,
    DyfiSummaryComponent,
    EventTitlePipe,
    FeRegionComponent,
    FileSizePipe,
    FiniteFaultMapPopupComponent,
    FiniteFaultOverlaysPipe,
    FiniteFaultSummaryComponent,
    FocalMechanismSummaryComponent,
    GetContentPipe,
    GetMapBoundsPipe,
    GetProductPipe,
    GetProductsPipe,
    GroundFailureOverlaysPipe,
    HasProductPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    IsActualEventPipe,
    IsDeletedEventPipe,
    IsErrorResponsePipe,
    IsScenarioEventPipe,
    KeysPipe,
    LinkProductComponent,
    LocationPipe,
    MapComponent,
    MilesKilometersPipe,
    MmiComponent,
    MobileCheckPipe,
    MomentTensorSummaryComponent,
    NearbySeismicityLinkPipe,
    NodalPlanesComponent,
    NumberPipe,
    NumberWithSeparatorPipe,
    OrderByPipe,
    OriginSummaryComponent,
    PagerSummaryComponent,
    PreferredCheckComponent,
    ProductAttributionComponent,
    ProductContentPipe,
    ProductPropertyPipe,
    ProductReviewedPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RomanToNumberPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakeAlertOverlaysPipe,
    ShakeAlertSummaryComponent,
    ShakemapOverlaysPipe,
    ShakemapSummaryComponent,
    SignificantFigurePipe,
    StationComponent,
    StationFlagComponent,
    StatusPipe,
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
    DirectionPipe,
    DownloadDialogComponent,
    DyfiCounterPipe,
    DyfiSummaryComponent,
    EventTitlePipe,
    FeRegionComponent,
    FileSizePipe,
    FiniteFaultSummaryComponent,
    FocalMechanismSummaryComponent,
    GetMapBoundsPipe,
    GetProductPipe,
    GetProductsPipe,
    GroundFailureOverlaysPipe,
    HasProductPipe,
    InteractiveMapBoundsPipe,
    InteractiveMapOverlaysPipe,
    IsActualEventPipe,
    IsDeletedEventPipe,
    IsErrorResponsePipe,
    IsScenarioEventPipe,
    KeysPipe,
    LinkProductComponent,
    LocationPipe,
    MapComponent,
    MatIconModule,
    MilesKilometersPipe,
    MmiComponent,
    MobileCheckPipe,
    MomentTensorSummaryComponent,
    NearbySeismicityLinkPipe,
    NodalPlanesComponent,
    NumberPipe,
    NumberWithSeparatorPipe,
    OrderByPipe,
    OriginSummaryComponent,
    PagerSummaryComponent,
    PreferredCheckComponent,
    ProductAttributionComponent,
    ProductContentPipe,
    ProductPropertyPipe,
    ProductReviewedPipe,
    RegionInfoOverlaysPipe,
    RomanPipe,
    RomanToNumberPipe,
    RoundDownPipe,
    RoundUpPipe,
    ShakeAlertOverlaysPipe,
    ShakeAlertSummaryComponent,
    ShakemapOverlaysPipe,
    ShakemapSummaryComponent,
    SignificantFigurePipe,
    StationComponent,
    StatusPipe,
    SummaryLinkComponent,
    SummaryLinkPipe,
    TensorPipe,
    TextProductComponent,
    UncertainValueComponent,
    UnitsPipe,
    DirectionPipe,
    GetContentPipe
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
  ],
  providers: [GeoService, WindowRef]
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
