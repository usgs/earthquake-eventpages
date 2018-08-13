import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterService } from '../../core/formatter.service';
import { UncertainValueComponent } from './uncertain-value.component';

describe('UncertainValueComponent', () => {
  let component: UncertainValueComponent;
  let fixture: ComponentFixture<UncertainValueComponent>;

  beforeEach(async(() => {
    const formatterServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [UncertainValueComponent],
      providers: [{ provide: FormatterService, useValue: formatterServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncertainValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
