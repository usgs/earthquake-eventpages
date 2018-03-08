import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {

  @Input() name: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
