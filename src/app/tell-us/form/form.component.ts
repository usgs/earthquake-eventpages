import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormLanguageService } from '../form-language.service';

@Component({
  selector: 'tell-us-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public location: any = null;
  public felt: boolean = null;

  public answers: any = {
    'fldSituation_felt': null,
    'ciim_mapLat': null,
    'ciim_mapLon': null
  };

  public questions: Array<any> = [
    {
      name: 'fldSituation_situation',
      label: 'What was your situation during the earthquake?',
      answers: [
          {'value': '', 'label': 'Not specified'},
          {'value': 'inside', 'label': 'Inside a building'},
          {'value': 'outside', 'label': 'Outside a building'},
          {'value': 'veh_stopped', 'label': 'In a stopped vehicle'},
          {'value': 'veh_moving', 'label': 'In a moving vehicle'},
          {'value': 'other', 'label': 'Other',
              'otherValue': '', 'otherLabel': 'Please describe'}
      ]
    },
    {
      name: 'd_text[]',
      label: 'Was there any damage to the building?',
      multiSelect: true,
      answers: [
        {'value': '_none', 'label': 'No Damage'},
        {'value': '_crackmin', 'label': 'Hairline cracks in walls'},
        {'value': '_crackwallfew', 'label': 'A few large cracks in walls'},
        {'value': '_crackwallmany', 'label': 'Many large cracks in walls'},
        {'value': '_tilesfell', 'label': 'Ceiling tiles or lighting fixtures fell'},
        {'value': '_crackchim', 'label': 'Cracks in chimney'},
        {'value': '_crackwindows', 'label': 'One or several cracked windows'},
        {'value': '_brokenwindows', 'label': 'Many windows cracked or some broken out'},
        {'value': '_masonryfell', 'label': 'Masonry fell from block or brick wall(s)'},
        {'value': '_majoroldchim', 'label': 'Old chimney, major damage or fell down'},
        {'value': '_majormodernchim', 'label': 'Modern chimney, major damage or fell down'},
        {'value': '_tiltedwall', 'label': 'Outside wall(s) tilted over or collapsed completely'},
        {'value': '_porch', 'label': 'Separation of porch, balcony, or other addition from building'},
        {'value': '_move', 'label': 'Building permanently shifted over foundation'}
      ]
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public languageService: FormLanguageService
  ) { }

  ngOnInit() {
  }

  /**
   * Called when user selects a language.
   *
   * @param selectEvent selected language.
   */
  changeLanguage (selectEvent) {
    this.languageService.getLanguage(selectEvent.value);
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

}
