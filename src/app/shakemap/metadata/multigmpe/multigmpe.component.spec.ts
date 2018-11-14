import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatExpansionModule } from '@angular/material';

import { MultiGmpeComponent } from './multigmpe.component';

describe('MultiGmpeComponent', () => {
  let component: MultiGmpeComponent;
  let fixture: ComponentFixture<MultiGmpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiGmpeComponent ],
      imports: [
        MatExpansionModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGmpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
