import { Component, Input } from '@angular/core';

/**
 * Generate download list item for a single product contents
 *
 * @param item any
 *    A single item from the product.contents[]
 */
@Component({
  selector: 'product-page-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.scss']
})
export class DownloadItemComponent {
  @Input() item: any = null;
}
