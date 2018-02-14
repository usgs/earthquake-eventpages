import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() event: any;
  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

}
