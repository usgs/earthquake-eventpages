import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormLanguageService } from '../form-language.service';


@Component({
  selector: 'tell-us-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // these answers control whether the submit button is enabled
  // others are populated as needed
  public answers: any = {
    'fldSituation_felt': null,
    'ciim_mapLat': null,
    'ciim_mapLon': null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public languageService: FormLanguageService
  ) { }

  ngOnInit() {
  }

  /**
   * Update response information.
   *
   * @param answer
   *        object with answers, field(s) are keys, values are values.
   */
  onAnswer (answer: any) {
    if (!answer) {
      return;
    }
    // copy responses into answers
    for (const key of Object.keys(answer)) {
      this.answers[key] = answer[key];
    }
  }

  /**
   * Called when user clicks cancel.
   */
  onCancel () {
    this.dialogRef.close(false);
  }

  /**
   * Called when form is submitted.
   *
   * Passes answers back to dialog opener.
   */
  onSubmit () {
    // TODO: validation

    this.dialogRef.close(this.answers);
  }


  /**
   * Called when user selects a language.
   *
   * @param language selected language.
   */
  setLanguage (language: string) {
    this.languageService.getLanguage(language);
  }

}
