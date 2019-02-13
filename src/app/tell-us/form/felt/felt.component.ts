import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';

@Component({
  selector: 'tell-us-form-felt',
  styleUrls: ['./felt.component.scss'],
  templateUrl: './felt.component.html'
})
export class FeltComponent extends AbstractForm implements OnInit {
  ngOnInit() {}
}
