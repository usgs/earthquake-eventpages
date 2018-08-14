import { Component, Input } from '@angular/core';
import { Tensor } from '@shared/beachball/tensor';

/**
 * Display tables with moment tensor data
 *
 * @param tensor
 *     Tensor data
 */
@Component({
  selector: 'moment-tensor-info',
  styleUrls: ['./info.component.scss'],
  templateUrl: './info.component.html'
})
export class InfoComponent {
  @Input()
  tensor: Tensor;
}
