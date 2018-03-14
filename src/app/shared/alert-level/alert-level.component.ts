import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-alert-level',
  templateUrl: './alert-level.component.html',
  styleUrls: ['./alert-level.component.scss']
})
export class AlertLevelComponent implements OnInit {

  public alertLevel: string;

  @Input() set alert(alertColor: string) {
    this.alertLevel = alertColor;
  }

  get alert() {
    return this.alertLevel;
  }

  constructor() { }

  ngOnInit() {
  }

}
