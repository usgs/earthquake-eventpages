import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material';

import { ProductPageComponent } from './product-page/product-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';
import { DownloadItemComponent } from './download-item/download-item.component';

import { FileSizePipe } from './file-size.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,

    SharedModule
  ],
  declarations: [
    ProductPageComponent,
    HeaderComponent,
    FooterComponent,

    DateTimePipe,
    DownloadComponent,
    DownloadItemComponent,

    FileSizePipe
  ],
  exports: [
    ProductPageComponent,

    DateTimePipe
  ]
})
export class ProductPageModule { }
