import { Component, OnInit, Input } from '@angular/core';
import { FormatterService } from '../../../core/formatter.service';

@Component({
  selector: 'shakemap-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor (public formatter: FormatterService) { }
  @Input() smInput: any;

  ngOnInit () {
  }

}
