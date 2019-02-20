import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import * as LANGUAGE_EN from './form-language/en.json';
import * as LANGUAGE_ES from './form-language/es.json';
import { TellUsText } from './form-language/tell-us-text.js';

/**
 * Form language service
 */
@Injectable()
export class FormLanguageService {
  set language(languageId: string) {
    this.getLanguage(languageId);
  }

  get language(): string {
    return this.language$.value.id;
  }

  // observable for current language
  language$: BehaviorSubject<any> = new BehaviorSubject(LANGUAGE_EN);
  // list of supported languages
  languages: Array<any> = [LANGUAGE_EN, LANGUAGE_ES];

  /**
   * Switch the selected language.
   * Defaults to English if requested language not found.
   *
   * @param id language id.
   */
  getLanguage(id: string) {
    let language = null;

    if (id) {
      // try to find requested language
      language = this.languages.find(lang => lang.id === id);
    }

    if (!language) {
      // default to english
      language = LANGUAGE_EN;
    }

    this.language$.next(language);
  }
}
