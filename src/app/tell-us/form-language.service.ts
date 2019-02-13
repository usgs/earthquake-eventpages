import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import * as LANGUAGE_EN from './form-language/en.json';
import * as LANGUAGE_ES from './form-language/es.json';

/**
 * Form language service
 */
@Injectable()
export class FormLanguageService {
  language: any = LANGUAGE_EN;
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
    this.language = null;

    if (id) {
      // try to find requested language
      this.language = this.languages.find(lang => lang.id === id);
    }

    if (!this.language) {
      // default to english
      this.language = LANGUAGE_EN;
    }

    this.language$.next(this.language);
  }

  translate(token: string, translations = this.language): string {
    return translations[token] || token;
  }
}
