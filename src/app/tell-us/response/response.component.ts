import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tell-us-response',
  styleUrls: ['./response.component.scss'],
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @Input()
  response: any; // TODO :: Make specific data model
  constructor() {}

  ngOnInit() {}
}
