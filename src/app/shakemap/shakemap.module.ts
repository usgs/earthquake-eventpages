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
import {
  MdcTabModule,
  MdcIconModule
} from '@angular-mdc/web';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { ShakemapComponent } from './shakemap/shakemap.component';
import { StationListComponent } from './station-list/station-list.component';
import { IntensityComponent } from './intensity/intensity.component';
import { MetadataComponent } from './metadata/metadata.component';
import { InputComponent } from './metadata/input/input.component';
import { OutputComponent } from './metadata/output/output.component';
import { ProcessingComponent } from './metadata/processing/processing.component';
import { PgaComponent } from './pga/pga.component';
import { PgvComponent } from './pgv/pgv.component';
import { PsaComponent } from './psa/psa.component';
import { ShakemapRoutingModule } from './shakemap-routing.module';
import { UncertaintyComponent } from './uncertainty/uncertainty.component';

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
    MdcIconModule,
    MdcTabModule,
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
    IntensityComponent,
    PgaComponent,
    PgvComponent,
    PsaComponent
  ],
  exports: [
    StationListComponent,
    MetadataComponent,
    UncertaintyComponent
  ]
})
export class ShakemapModule { }
