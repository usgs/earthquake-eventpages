import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventService } from './event.service';
import { ContentsXmlService } from './contents-xml.service';
import { ContributorService } from './contributor.service';
import { QuakemlService } from './quakeml.service';
import { FormatterService } from './formatter.service';
import { GeoserveService } from './geoserve.service';

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
        QuakemlService
      ]
    };
  }
}
