import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxesComponent } from './axes.component';
import { MatTableModule } from '@angular/material';

describe('AxesComponent', () => {
  let component: AxesComponent;
  let fixture: ComponentFixture<AxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        AxesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
