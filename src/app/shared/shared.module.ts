import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProductComponent } from './text-product/text-product.component';
import { LinkProductComponent } from './link-product/link-product.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    DownloadDialogComponent,
    LinkProductComponent,
    TextProductComponent
  ],
  exports: [
    DownloadDialogComponent,
    LinkProductComponent,
    TextProductComponent
  ],
  entryComponents: [
    DownloadDialogComponent
  ]
})
export class SharedModule { }
