import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'dyfi',
  templateUrl: './dyfi.component.html',
  styleUrls: ['./dyfi.component.scss']
})
export class DyfiComponent implements OnInit {
  @ViewChild('downloadCSV') private downloadEl: ElementRef;
  link = '';

  constructor (public eventService: EventService) { }

  ngOnInit () {
    this.eventService.product$.subscribe(
      (product) => {
        if (product) {
          this.link = product.contents['cdi_zip.txt'].url;
        }
      }
    );
  }

}
