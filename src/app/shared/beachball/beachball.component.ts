import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tensor } from './tensor';
import { Beachball } from './beachball';


@Component({
  selector: 'shared-beachball',
  templateUrl: './beachball.component.html',
  styleUrls: ['./beachball.component.css']
})
export class BeachballComponent implements OnInit, OnChanges {

  public readonly tensor$ = new BehaviorSubject<Tensor>(null);

  @Input() tensor: Tensor;

  @Input() fillColor = '#ddd';
  @Input() labelAxes = true;
  @Input() labelPlanes = true;
  @Input() size = 320;


  @ViewChild('beachball') elementRef: ElementRef;

  constructor () { }

  ngOnInit () {
  }

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
