import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPinTitleComponent } from './basic-pin-title.component';

describe('BasicPinTitleComponent', () => {
  let component: BasicPinTitleComponent;
  let fixture: ComponentFixture<BasicPinTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPinTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
