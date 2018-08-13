import { TestBed, inject } from '@angular/core/testing';

import { FormLanguageService } from './form-language.service';

describe('FormLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormLanguageService]
    });
  });

  it('should be created', inject(
    [FormLanguageService],
    (service: FormLanguageService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('getLanguage', () => {
    it('finds languages by id', inject(
      [FormLanguageService],
      (service: FormLanguageService) => {
        spyOn(service.language$, 'next');
        service.getLanguage('es');
        expect(service.language$.next).toHaveBeenCalledWith(
          service.languages[1]
        );
      }
    ));

    it('defaults to english', inject(
      [FormLanguageService],
      (service: FormLanguageService) => {
        spyOn(service.language$, 'next');
        service.getLanguage(null);
        expect(service.language$.next).toHaveBeenCalledWith(
          service.languages[0]
        );
      }
    ));
  });
});
