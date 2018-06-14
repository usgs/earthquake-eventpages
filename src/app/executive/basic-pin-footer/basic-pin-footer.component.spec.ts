import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPinFooterComponent } from './basic-pin-footer.component';

describe('BasicPinFooterComponent', () => {
  let component: BasicPinFooterComponent;
  let fixture: ComponentFixture<BasicPinFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPinFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
