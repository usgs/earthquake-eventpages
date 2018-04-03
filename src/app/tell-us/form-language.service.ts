import { Injectable } from '@angular/core';

import * as LANGUAGE_EN from './form-language/en.json';
import * as LANGUAGE_ES from './form-language/es.json';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FormLanguageService {

  public languages: Array<any> = [
    LANGUAGE_EN,
    LANGUAGE_ES
  ];

  public language$: BehaviorSubject<any> = new BehaviorSubject(LANGUAGE_EN);

  constructor() { }

  public getLanguage (id: string) {
    let language = null;

    if (id) {
      // try to find requested language
      language = this.languages.find((lang) => {
        return (lang.id === id);
      });
    }

    if (!language) {
      // default to english
      language = LANGUAGE_EN;
    }

    this.language$.next(language);
  }

}
