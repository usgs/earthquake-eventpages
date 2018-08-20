import { Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';

/**
 * Display attribution table for Focal Mechanism product
 *
 * @param tensor
 *     Tensor object
 */
@Component({
  selector: 'focal-mechanism-attribution',
  styleUrls: ['./attribution.component.scss'],
  templateUrl: './attribution.component.html'
})
export class AttributionComponent {
  @Input()
  tensor: Tensor;
}
