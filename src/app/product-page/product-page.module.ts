import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material';

import { ProductPageComponent } from './product-page/product-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ContributorListPipe } from './contributor-list.pipe';
import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';

import { DownloadItem } from './download/download-item.pipe'

@NgModule({
  imports: [
    BrowserAnimationsModule,
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

    DownloadItem
  ],
  exports: [
    ProductPageComponent
  ]
})
export class ProductPageModule { }
