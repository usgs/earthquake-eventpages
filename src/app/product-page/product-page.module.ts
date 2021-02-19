import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';
import { DownloadItemComponent } from './download-item/download-item.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FileExtensionPipe } from './file-extension.pipe';

@NgModule({
  declarations: [
    DateTimePipe,
    DownloadComponent,
    DownloadItemComponent,
    FileExtensionPipe,
    FooterComponent,
    HeaderComponent,
    ProductPageComponent
  ],
  exports: [DateTimePipe, ProductPageComponent, DownloadComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule, SharedModule]
})
export class ProductPageModule {}
