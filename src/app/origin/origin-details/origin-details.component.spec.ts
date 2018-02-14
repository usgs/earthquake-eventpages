import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginDetailsComponent } from './origin-details.component';

describe('OriginDetailsComponent', () => {
  let component: OriginDetailsComponent;
  let fixture: ComponentFixture<OriginDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
