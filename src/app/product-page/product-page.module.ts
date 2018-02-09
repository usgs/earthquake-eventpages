import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ContributorListPipe } from './contributor-list.pipe';
import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductPageComponent,
    HeaderComponent,
    FooterComponent,

    ContributorListPipe,
    DateTimePipe,
    DownloadComponent
  ],
  exports: [
    ProductPageComponent
  ]
})
export class ProductPageModule { }
