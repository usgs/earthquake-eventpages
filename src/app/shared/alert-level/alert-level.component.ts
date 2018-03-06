import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-alert-level',
  templateUrl: './alert-level.component.html',
  styleUrls: ['./alert-level.component.scss']
})
export class AlertLevelComponent implements OnInit {

  public color: string;
  private _alertLevel: string;

  @Input() set alert(alertColor: string) {
    this._alertLevel = alertColor;
    this.color = alertColor;
  }

  get alert() {
    return this._alertLevel;
  }

  constructor() { }

  ngOnInit() {
  }

}
