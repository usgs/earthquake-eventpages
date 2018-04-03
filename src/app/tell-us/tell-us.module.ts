import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellUsComponent } from './tell-us/tell-us.component';
import { SharedModule } from '../shared/shared.module';
import { TellUsRoutingModule } from './tell-us-routing.module';
import { FormComponent } from './form/form.component';
import { MatButtonModule, MatDialogModule, MatExpansionModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { FormLanguageService } from './form-language.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,

    SharedModule,
    TellUsRoutingModule
  ],
  declarations: [
    TellUsComponent,
    FormComponent
  ],
  entryComponents: [
    FormComponent
  ],
  providers: [
    FormLanguageService
  ],
  exports: [
    FormComponent
  ]
})
export class TellUsModule { }
