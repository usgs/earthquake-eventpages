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
 */
@Component({
  selector: 'shared-beachball',
  templateUrl: './beachball.component.html',
  styleUrls: ['./beachball.component.scss']
})
export class BeachballComponent implements OnChanges {


  public readonly tensor$ = new BehaviorSubject<Tensor>(null);

  @Input() tensor: Tensor;
  @Input() fillColor = '#ddd';
  @Input() labelAxes = true;
  @Input() labelPlanes = true;
  @Input() size = 320;

  @ViewChild('beachball') elementRef: ElementRef;


  constructor () { }

  /**
   * Render the beachball visual on changes
   */
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
