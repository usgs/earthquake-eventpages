import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';
import { FeltReport } from 'app/tell-us/felt-report';

@Component({
  selector: 'tell-us-form-submit',
  styleUrls: ['./submit.component.scss'],
  templateUrl: './submit.component.html'
})
// TODO: if we decide to keep the form on a server error instead of
// showing an error response in the tell-us template, implement a snackbar
// and stop the spinner dynamically instead of in setTimeout
export class SubmitComponent extends AbstractForm {
  // Event emitter passing the FeltReport model data
  @Output()
  submit = new EventEmitter<FeltReport>();
  submitting = false;

  onSubmit() {
    // artificially set a spinner for a set amount of time to prevent it
    // spinning forever in the event of an error hanging up the form
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 3000);
    this.submit.emit(this.feltReport);
  }
}
