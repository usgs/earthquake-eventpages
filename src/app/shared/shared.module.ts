import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProductComponent } from './text-product/text-product.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { MatDialogModule } from '@angular/material';
import { BeachballComponent } from './beachball/beachball.component';
import { ProductAttributionComponent } from './product-attribution/product-attribution.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    BeachballComponent,
    DownloadDialogComponent,
    LinkProductComponent,
    ProductAttributionComponent,
    TextProductComponent
  ],
  exports: [
    BeachballComponent,
    DownloadDialogComponent,
    LinkProductComponent,
    ProductAttributionComponent,
    TextProductComponent
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
