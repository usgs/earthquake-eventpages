import { Component } from '@angular/core';

import { AbstractForm } from '../abstract-form.component';
import { FormSubmitService } from 'app/tell-us/form-submit.service';

@Component({
  selector: 'tell-us-form-submit',
  styleUrls: ['./submit.component.scss'],
  templateUrl: './submit.component.html'
})
export class SubmitComponent extends AbstractForm {
  constructor(public formSubmitService: FormSubmitService) {
    super();
  }

  onSubmit() {
    this.formSubmitService.onSubmit(this.feltReport);
  }
}
