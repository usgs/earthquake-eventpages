import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ContentsXmlService } from './contents-xml.service';
import { ContributorService } from './contributor.service';
import { EventService } from './event.service';
import { FormatterService } from './formatter.service';
import { GeoserveService } from './geoserve.service';
import { MetadataService } from './metadata.service';
import { QuakemlService } from './quakeml.service';
import { StationService } from './station.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ContentsXmlService,
        ContributorService,
        EventService,
        FormatterService,
        GeoserveService,
        QuakemlService,
        StationService,
        MetadataService
      ]
    };
  }
}
