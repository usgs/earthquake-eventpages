import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

import { LocationViewModule } from 'hazdev-ng-location-view';
import { SharedModule } from '@shared/shared.module';

import { ContactComponent } from './form/contact/contact.component';
import { FeltComponent } from './form/felt/felt.component';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormComponent } from './form/form.component';
import { FormLanguageService } from './form-language.service';
import { FormSubmitService } from './form-submit.service';
import { LocationComponent } from './form/location/location.component';
import { MapComponent } from './form/location/map/map.component';
import { MetadataComponent } from './form/metadata/metadata.component';
import { OptionalComponent } from './form/optional/optional.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';
import { QuestionComponent } from './question/question.component';
import { ResponseComponent } from './response/response.component';
import { SubmitComponent } from './form/submit/submit.component';
import { SuccessViewComponent } from './success-view/success-view.component';
import { TellUsComponent } from './tell-us/tell-us.component';
import { TellUsRoutingModule } from './tell-us-routing.module';
import { LocationPipe } from './location.pipe';

@NgModule({
  declarations: [
    ContactComponent,
    FeltComponent,
    FieldsetComponent,
    FormComponent,
    LocationComponent,
    MapComponent,
    MetadataComponent,
    OptionalComponent,
    PrivacyStatementComponent,
    QuestionComponent,
    ResponseComponent,
    SubmitComponent,
    SuccessViewComponent,
    TellUsComponent,
    LocationPipe
  ],
  exports: [LocationPipe, TellUsComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,

    LocationViewModule.forRoot(),
    SharedModule,

    // routing module is always last
    TellUsRoutingModule
  ],
  providers: [FormLanguageService, FormSubmitService]
})
export class TellUsModule {}
