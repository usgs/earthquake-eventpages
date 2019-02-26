import { Component } from '@angular/core';
import * as QuestionData from '../questions.json';
import { AbstractForm } from '../abstract-form.component.js';

@Component({
  selector: 'tell-us-form-optional',
  styleUrls: ['./optional.component.scss'],
  templateUrl: './optional.component.html'
})
export class OptionalComponent extends AbstractForm {
  questions = QuestionData;
}
