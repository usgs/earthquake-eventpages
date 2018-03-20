import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shakemap-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }
  @Input() smInput: any;

  ngOnInit() {
  }

}
