import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'oaf-commentary-details',
  templateUrl: './commentary-details.component.html',
  styleUrls: ['./commentary-details.component.scss']
})
export class CommentaryDetailsComponent implements OnInit {

  @Input()
  public bin: any;

  constructor () { }

  ngOnInit() {
  }

}
