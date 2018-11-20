
import {animate, state, style, transition, trigger} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  animations: [
    trigger('detailExpand', [
      state('collapsed',
        style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rotate180', [
      state('collapsed',
        style({transform: '*'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('150ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shakemap-multigmpe',
  styleUrls: ['./multigmpe.component.scss', '../metadata.component.scss'],
  templateUrl: './multigmpe.component.html',
})
export class MultiGmpeComponent {
  columnNames = {
    'name': 'Name',
    'weight': 'Weight'
  };
  columnsToDisplay = ['name', 'weight'];
  expandedGmpe = null;

  @Input()
  smMultiGmpe: any;
  constructor () { }

  toggleGmpe (gmpe) {
    if (gmpe.gmpes.length === 0) {
      return;
    }

    if (!gmpe.expanded || gmpe.expanded === 'collapsed') {
      gmpe.expanded = 'expanded';
    } else {
      gmpe.expanded = 'collapsed';
    }
  }

}
