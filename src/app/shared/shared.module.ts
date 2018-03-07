import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProductComponent } from './text-product/text-product.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { BeachballComponent } from './beachball/beachball.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';
import { PreferredCheckComponent } from './preferred-check/preferred-check.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    BeachballComponent,
    DownloadDialogComponent,
    LinkProductComponent,
    ProductAttributionComponent,
    TextProductComponent,
    PreferredCheckComponent
  ],
  exports: [
    BeachballComponent,
    DownloadDialogComponent,
    LinkProductComponent,
    MatIconModule,
    ProductAttributionComponent,
    PreferredCheckComponent,
    TextProductComponent
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
