import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellUsComponent } from './tell-us/tell-us.component';
import { SharedModule } from '../shared/shared.module';
import { TellUsRoutingModule } from './tell-us-routing.module';
import { FormComponent } from './form/form.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,

    SharedModule,
    TellUsRoutingModule
  ],
  declarations: [
    TellUsComponent,
    FormComponent
  ],
  entryComponents: [
    FormComponent
  ]
})
export class TellUsModule { }
