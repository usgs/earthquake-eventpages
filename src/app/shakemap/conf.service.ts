import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfService {
  public conf = {};
  constructor(private http: HttpClient) { }

  
  getConfigs() {
    /* This is a description */
    this.http.get('configs.json')
      .subscribe(conf => {
        this.conf = conf;
      });
  }
}
