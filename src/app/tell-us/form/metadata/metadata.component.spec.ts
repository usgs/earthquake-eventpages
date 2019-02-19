import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatExpansionModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { FormLanguageService } from './../../form-language.service';
import { MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {
    const formLanguageServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [
        MetadataComponent,
        MockComponent({ selector: 'tell-us-privacy-statement' })
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        { provide: FormLanguageService, useValue: formLanguageServiceStub }
      ]
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
