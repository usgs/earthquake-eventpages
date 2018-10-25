import { Component, Input } from '@angular/core';

@Component({
  selector: 'success-view',
  styleUrls: ['./success-view.component.scss'],
  templateUrl: './success-view.component.html'
})
export class SuccessViewComponent {
  @Input()
  success: any;

  constructor() {}
}
