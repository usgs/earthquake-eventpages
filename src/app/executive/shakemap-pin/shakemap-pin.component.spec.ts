import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakemapPinComponent } from './shakemap-pin.component';

describe('ShakemapPinComponent', () => {
  let component: ShakemapPinComponent;
  let fixture: ComponentFixture<ShakemapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakemapPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
