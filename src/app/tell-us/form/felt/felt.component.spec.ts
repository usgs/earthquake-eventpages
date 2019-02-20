import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeltComponent } from './felt.component';

describe('FeltComponent', () => {
  let component: FeltComponent;
  let fixture: ComponentFixture<FeltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeltComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
