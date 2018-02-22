import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProductComponent } from './text-product/text-product.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextProductComponent
  ],
  exports: [
    TextProductComponent
  ]
})
export class SharedModule { }
