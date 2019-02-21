import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { MetadataComponent } from './metadata.component';
import { FormLanguageService } from 'app/tell-us/form-language.service';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MetadataComponent,

        MockComponent({ selector: 'mat-expansion-panel-header' }),
        MockComponent({ selector: 'tell-us-privacy-statement' }),
        MockComponent({ selector: 'mat-expansion-panel' }),
        MockComponent({ selector: 'mat-label' }),
        MockComponent({ selector: 'mat-select', inputs: ['ngModel'] }),
        MockComponent({ inputs: ['value'], selector: 'mat-option' }),
        MockComponent({ selector: 'mat-form-field' })
      ],
      providers: [FormLanguageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLanguageSelect', function() {
    it('gets the language from the language service', () => {
      const id = 'en';

      spyOn(component.languageService, 'getLanguage');
      component.onLanguageSelect(id);

      expect(component.languageService.getLanguage).toHaveBeenCalled();
      expect(component.languageService.getLanguage).toHaveBeenCalledWith(id);
    });
  });
});
