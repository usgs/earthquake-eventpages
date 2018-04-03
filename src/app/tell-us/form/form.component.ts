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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public languageService: FormLanguageService
  ) { }

  ngOnInit() {
  }

  changeLanguage (selectEvent) {
    this.languageService.getLanguage(selectEvent.value);
  }

  clearLocationAndFelt () {
    this.location = null;
    this.felt = null;
  }

  enterLocationAndFelt () {
    this.location = 'some location';
    this.felt = !!'maybe';
  }

  onSubmit () {
    this.dialogRef.close({
      location: this.location,
      felt: this.felt
    });
  }

}
