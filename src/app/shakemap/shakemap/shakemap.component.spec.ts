import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakemapComponent } from './shakemap.component';

describe('ShakemapComponent', () => {
  let component: ShakemapComponent;
  let fixture: ComponentFixture<ShakemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
