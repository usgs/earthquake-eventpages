import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';

@Component({
  selector: 'tell-us-form-contact',
  styleUrls: ['./contact.component.scss'],
  templateUrl: './contact.component.html'
})
export class ContactComponent extends AbstractForm implements OnInit {
  ngOnInit() {}
}
