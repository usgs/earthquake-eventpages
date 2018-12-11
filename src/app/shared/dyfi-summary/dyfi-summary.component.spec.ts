import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng2-mock-component';

import { DyfiSummaryComponent } from './dyfi-summary.component';

describe('DyfisummaryComponent', () => {
  let component: DyfiSummaryComponent;
  let fixture: ComponentFixture<DyfiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiSummaryComponent,
        MockComponent({
          inputs: ['intensity'],
          selector: 'shared-mmi'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockComponent({
          inputs: ['TITLE'],
          selector: 'shared-preferred-check'
        })
      ],
      imports: [MatTableModule, RouterModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
