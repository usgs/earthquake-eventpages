import { Component, Input, OnInit } from '@angular/core';

import { Response } from '../response';

@Component({
  selector: 'tell-us-response',
  styleUrls: ['./response.component.scss'],
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @Input()
  response: Response;
  constructor() {}

  ngOnInit() {}
}
