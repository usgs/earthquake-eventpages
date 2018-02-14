import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-page-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  @Input() item: any = null;

  constructor () { }

  ngOnInit () {
  }

}
