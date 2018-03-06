import { Component, OnInit, Input } from '@angular/core';
import { Tensor } from '../../shared/beachball/tensor';
import { FormatterService } from '../../formatter.service';

@Component({
  selector: 'moment-tensor-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public round = Math.round;

  @Input() tensor: Tensor;

  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit() {
  }

}
