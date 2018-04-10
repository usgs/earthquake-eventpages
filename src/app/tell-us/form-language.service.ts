import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as LANGUAGE_EN from './form-language/en.json';
import * as LANGUAGE_ES from './form-language/es.json';


@Injectable()
export class FormLanguageService {

  // list of supported languages
  public languages: Array<any> = [
    LANGUAGE_EN,
    LANGUAGE_ES
  ];

  // observable for current language
  public language$: BehaviorSubject<any> = new BehaviorSubject(LANGUAGE_EN);

  constructor() { }

  /**
   * Switch the selected language.
   * Defaults to English if requested language not found.
   *
   * @param id language id.
   */
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
