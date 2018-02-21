import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardTitle,
  MatCardTitleGroup,
  MatCardContent,
  MatCardImage,
  MatCardActions,
  MatCardFooter
} from '@angular/material';

import { ExecutiveComponent } from './executive/executive.component';
import { OriginPinComponent } from './origin-pin/origin-pin.component';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductPageModule,
    SharedModule
  ],
  declarations: [
    ExecutiveComponent,
    MatCard,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCardFooter,
    OriginPinComponent

  ]
})
export class ExecutiveModule { }
