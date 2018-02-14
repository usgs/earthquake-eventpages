import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'origin-details',
  templateUrl: './origin-details.component.html',
  styleUrls: ['./origin-details.component.css']
})
export class OriginDetailsComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

  toJson(data: any) {
    return JSON.stringify(data, null, 2);
  }

}
