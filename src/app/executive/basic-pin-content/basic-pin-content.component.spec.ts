import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPinContentComponent } from './basic-pin-content.component';

describe('BasicPinContentComponent', () => {
  let component: BasicPinContentComponent;
  let fixture: ComponentFixture<BasicPinContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPinContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
