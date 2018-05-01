import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OafComponent } from './oaf.component';

describe('OafComponent', () => {
  let component: OafComponent;
  let fixture: ComponentFixture<OafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
