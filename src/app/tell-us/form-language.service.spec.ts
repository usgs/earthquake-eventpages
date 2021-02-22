import { TestBed, inject, async } from '@angular/core/testing';

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
    it('finds languages by id', async(inject(
      [FormLanguageService],
      (service: FormLanguageService) => {
        // spyOn(service.language$, 'next');
        let first = true;
        service.language$.subscribe((value) => {
          console.log(value.id);
          if (first) {
            // first value is default
            first = false;
          } else {
            expect(value.id).toEqual(service.languages[1].id);
          }
        });
        // now trigger es load
        service.getLanguage('es');
      }
    )));

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
