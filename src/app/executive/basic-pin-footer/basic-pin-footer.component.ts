import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-basic-pin-footer',
  templateUrl: './basic-pin-footer.component.html',
  styleUrls: ['./basic-pin-footer.component.scss']
})
export class BasicPinFooterComponent implements OnInit {

  @Input() footer;
  @Input() product;

  constructor() { }

  ngOnInit() {
  }

}
