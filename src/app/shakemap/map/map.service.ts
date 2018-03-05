import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MapService {
  public plotEvent = new ReplaySubject(1);
  public setBounds = new ReplaySubject(1);
  public mapKey: string = 'pk.eyJ1IjoiZHNsb3NreSIsImEiOiJjaXR1aHJnY3EwMDFoMnRxZWVtcm9laWJmIn0.1C3GE0kHPGOpbVV9kTxBlQ';
  public map: any = null;
  
  constructor() { }

}
