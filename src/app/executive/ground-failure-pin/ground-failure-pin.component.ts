import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

/**
 * Ground Failure Pin
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-ground-failure-pin',
  styleUrls: ['./ground-failure-pin.component.scss'],
  templateUrl: './ground-failure-pin.component.html'
})
export class GroundFailurePinComponent implements OnInit {
  link = '../ground-failure';
  @Input()
  product: any;
  title = 'Ground Failure';

  ngOnInit() {
    console.log('product: ', this.product);
  }

  getSwitchClass() {
    console.log('called!');
    if (this.product && this.product.properties) {
      if (
        this.product.properties['landslide-hazard-alert-color'] === 'pending'
      ) {
        return 'alert info';
      }
    }
  }
}
