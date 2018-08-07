import {
  Component,
  ElementRef,
  OnChanges,
  Input,
  ViewChild
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Beachball } from './beachball';
import { Tensor } from './tensor';


/**
 * The beachball component
 * @param tensor
 *     The moment tensor object
 * @param fillColor
 *     The fill color of the beachball
 * @param labelAxes
 *     Boolean for whether or not axes should be labeled
 * @param labelPlanes
 *     Boolean for whether or not planes should be labeled
 * @param size
 *     Size, in pixels, of the diameter of the beachball
 */
@Component({
  selector: 'shared-beachball',
  templateUrl: './beachball.component.html',
  styleUrls: ['./beachball.component.scss']
})
export class BeachballComponent implements OnChanges {


  @Input() tensor: Tensor;
  @Input() fillColor = '#ddd';
  @Input() labelAxes = true;
  @Input() labelPlanes = true;
  @Input() size = 320;

  @ViewChild('beachball') elementRef: ElementRef;

  public readonly tensor$ = new BehaviorSubject<Tensor>(null);


  ngOnChanges () {
    if (!this.tensor) {
      return;
    }

    Beachball.render(this.tensor, this.elementRef.nativeElement, {
      fillColor: this.fillColor,
      labelAxes: this.labelAxes,
      labelPlanes: this.labelPlanes,
      size: this.size
    });
  }

}
