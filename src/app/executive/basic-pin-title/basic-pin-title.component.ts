import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'executive-basic-pin-title',
  templateUrl: './basic-pin-title.component.html',
  styleUrls: ['./basic-pin-title.component.scss']
})
export class BasicPinTitleComponent implements OnInit {

  @Input() link;
  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
