import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'event-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() event: any;

  constructor () { }

  ngOnInit () {
  }

}
