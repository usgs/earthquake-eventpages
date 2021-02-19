import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LocationViewModule } from 'hazdev-ng-location-view';
import { SharedModule } from '@shared/shared.module';

import { ContactComponent } from './form/contact/contact.component';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { FeltComponent } from './form/felt/felt.component';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormComponent } from './form/form.component';
import { FormLanguageService } from './form-language.service';
import { FormSubmitService } from './form-submit.service';
import { LocationComponent } from './form/location/location.component';
import { LocationPipe } from './location.pipe';
import { MapComponent } from './form/location/map/map.component';
import { MetadataComponent } from './form/metadata/metadata.component';
import { OptionalComponent } from './form/optional/optional.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';
import { QuestionComponent } from './question/question.component';
import { ResponseComponent } from './response/response.component';
import { SubmitComponent } from './form/submit/submit.component';
import { SuccessResponseComponent } from './success-response/success-response.component';
import { TellUsComponent } from './tell-us/tell-us.component';
import { TellUsRoutingModule } from './tell-us-routing.module';

@NgModule({
  declarations: [
    ContactComponent,
    ErrorResponseComponent,
    FeltComponent,
    FieldsetComponent,
    FormComponent,
    LocationComponent,
    LocationPipe,
    MapComponent,
    MetadataComponent,
    OptionalComponent,
    PrivacyStatementComponent,
    QuestionComponent,
    ResponseComponent,
    SubmitComponent,
    SuccessResponseComponent,
    TellUsComponent
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
