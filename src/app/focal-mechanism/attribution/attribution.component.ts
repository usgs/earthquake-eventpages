import { Component, Input, OnInit } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';

@Component({
  selector: 'focal-mechanism-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss']
})
export class AttributionComponent implements OnInit {

  @Input() tensor: Tensor;

  constructor() { }

  ngOnInit() {
  }

}
