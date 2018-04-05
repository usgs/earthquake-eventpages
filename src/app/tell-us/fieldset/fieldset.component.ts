import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tell-us-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit {

  @Input() legend: string;

  constructor() { }

  ngOnInit() {
  }

}
