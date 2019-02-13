import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';
import { FeltReport } from 'app/tell-us/felt-report';

@Component({
  selector: 'tell-us-form-submit',
  styleUrls: ['./submit.component.scss'],
  templateUrl: './submit.component.html'
})
export class SubmitComponent extends AbstractForm implements OnInit {
  @Output()
  submit = new EventEmitter<FeltReport>();

  ngOnInit() {}

  onSubmit() {
    this.submit.emit(this.feltReport);
  }
}
