import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

import { SharedModule } from '@shared/shared.module';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormComponent } from './form/form.component';
import { FormLanguageService } from './form-language.service';
import { LocationComponent } from './form/location/location.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';
import { QuestionComponent } from './question/question.component';
import { SuccessViewComponent } from './success-view/success-view.component';
import { TellUsComponent } from './tell-us/tell-us.component';
import { TellUsRoutingModule } from './tell-us-routing.module';
import { LocationViewModule } from 'hazdev-ng-location-view';
import { LanguagePipe } from './language.pipe';
import { ResponseComponent } from './response/response.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MapDialogComponent } from './location/map/map.component';
import { CoordinateMarkerPipe } from './location/coordinate-marker.pipe';
import { FeltComponent } from './form/felt/felt.component';
import { OptionalComponent } from './form/optional/optional.component';
import { ContactComponent } from './form/contact/contact.component';
import { SubmitComponent } from './form/submit/submit.component';

@NgModule({
  declarations: [
    FieldsetComponent,
    FormComponent,
    LocationComponent,
    QuestionComponent,
    SuccessViewComponent,
    TellUsComponent,
    PrivacyStatementComponent,
    LanguagePipe,
    ResponseComponent,
    MetadataComponent,
    MapDialogComponent,
    CoordinateMarkerPipe,
    FeltComponent,
    OptionalComponent,
    ContactComponent,
    SubmitComponent
  ],
  entryComponents: [MapDialogComponent],
  exports: [FormComponent, TellUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LocationViewModule.forRoot(),
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
  providers: [FormLanguageService]
})
export class TellUsModule {}
