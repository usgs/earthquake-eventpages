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
        MockComponent({ inputs: ['value'], selector: 'mat-select' }),
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
});
