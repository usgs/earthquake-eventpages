import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProductComponent } from './text-product/text-product.component';
import { LinkProductComponent } from './link-product/link-product.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LinkProductComponent,
    TextProductComponent
  ],
  exports: [
    LinkProductComponent,
    TextProductComponent
  ]
})
export class SharedModule { }
