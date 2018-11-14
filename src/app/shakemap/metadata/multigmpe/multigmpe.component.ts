import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shakemap-multigmpe',
  styleUrls: ['./multigmpe.component.scss', '../metadata.component.scss'],
  templateUrl: './multigmpe.component.html'
})
export class MultiGmpeComponent {

  @Input()
  smMultiGmpe: any;
  constructor () { }

}
