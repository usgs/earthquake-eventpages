import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormComponent } from './form/form.component';
import { FormLanguageService } from './form-language.service';
import { LocationComponent } from './location/location.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';
import { QuestionComponent } from './question/question.component';
import { TellUsComponent } from './tell-us/tell-us.component';
import { TellUsRoutingModule } from './tell-us-routing.module';

import { LocationInputModule } from 'hazdev-location-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LocationInputModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    SharedModule,

    // routing module is always last
    TellUsRoutingModule
  ],
  declarations: [
    FieldsetComponent,
    FormComponent,
    LocationComponent,
    QuestionComponent,
    TellUsComponent,
    PrivacyStatementComponent
  ],
  entryComponents: [
    FormComponent
  ],
  exports: [
    FormComponent,
    TellUsComponent
  ],
  providers: [
    FormLanguageService
  ]
})
export class TellUsModule { }
