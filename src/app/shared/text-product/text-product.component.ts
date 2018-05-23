import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject ,  of ,  Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'shared-text-product',
  templateUrl: './text-product.component.html',
  styleUrls: ['./text-product.component.css']
})
export class TextProductComponent implements OnInit {

  @Input() contentPath = '';

  private _product: any;

  private content = new BehaviorSubject<any>(null);
  public readonly content$ = this.content.asObservable();

  public error: any;

  constructor(
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  get product() {
    return this._product;
  }

  @Input() set product(product) {
    this._product = product;

    this.getContent();
  }

  getContent () {
    if (!this.product) {
      this.error = null;
      this.content.next(null);
      return;
    }

    const content = this.product.contents[this.contentPath];
    if (!content) {
      this.error = new Error('no content');
      this.content.next(null);
      return;
    }

    this.error = null;
    if (content.bytes) {
      this.content.next(content.bytes);
    } else if (content.url) {
      const options = {responseType: 'text' as 'text'};

      this.httpClient.get(content.url, options).pipe(
        catchError((err: HttpErrorResponse): Observable<any> => {
          this.error = err;
          return of(null);
        })
      ).subscribe((data) => {
        this.content.next(data);
      });
    } else {
      this.error = new Error('no content bytes or url');
      this.content.next(null);
    }
  }

  replaceRelativePaths (text: string) {
    const product = this.product || {};
    const contents = this.product.contents || {};

    // replace relative urls with absolute urls
    for (const path in contents) {
      if (!path) {
        // no url to empty path
        continue;
      }
      text = text.replace(new RegExp('"' + path + '"', 'g'),
            '"' + contents[path].url + '"');
    }

    return text;
  }

}
