import { Component, Input } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';


/**
 * Display attribution table for Focal Mechanism product
 *
 * @param tensor
 *     Tensor object
 */
@Component({
  selector: 'focal-mechanism-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss']
})
export class AttributionComponent {

  @Input() tensor: Tensor;
}
