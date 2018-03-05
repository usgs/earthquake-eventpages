import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/replaysubject';

@Injectable()
export class InfoService {
  public data = new ReplaySubject(1);
  public hasData: boolean = false;

  constructor(private http: HttpClient) { }

  getInfo(event) {
    let contents = event['shakemap'][0]['contents'];
    if (contents['download/info.json']) {
      this.http.get(contents['download/info.json']['url'])
        .subscribe(info => {
          this.data.next(info);
          this.hasData = true;
        })
    } else {
      this.data.next(null);
      this.hasData = false;
    }
  }
}
