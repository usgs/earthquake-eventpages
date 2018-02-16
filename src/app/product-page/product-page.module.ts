import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material';

import { ProductPageComponent } from './product-page/product-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ContributorListPipe } from './contributor-list.pipe';
import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';
import { DownloadItemComponent } from './download-item/download-item.component';

import { FileSizePipe } from './file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [
    ProductPageComponent,
    HeaderComponent,
    FooterComponent,

    ContributorListPipe,
    DateTimePipe,
    DownloadComponent,
    DownloadItemComponent,

    FileSizePipe
  ],
  exports: [
    ProductPageComponent
  ]
})
export class ProductPageModule { }
