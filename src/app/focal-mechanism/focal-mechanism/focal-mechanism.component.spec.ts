import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocalMechanismComponent } from './focal-mechanism.component';

describe('FocalMechanismComponent', () => {
  let component: FocalMechanismComponent;
  let fixture: ComponentFixture<FocalMechanismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocalMechanismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocalMechanismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
