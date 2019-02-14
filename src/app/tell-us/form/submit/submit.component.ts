import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';
import { FeltReport } from 'app/tell-us/felt-report';

@Component({
  selector: 'tell-us-form-submit',
  styleUrls: ['./submit.component.scss'],
  templateUrl: './submit.component.html'
})
export class SubmitComponent extends AbstractForm {
  // Event emitter passing the FeltReport model data
  @Output()
  submit = new EventEmitter<FeltReport>();
  submitting = false;

  onSubmit() {
    this.submitting = true;
    this.submit.emit(this.feltReport);
  }
}
