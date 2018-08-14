import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng2-mock-component';

import { ShakemapSummaryComponent } from './shakemap-summary.component';

describe('ShakeMapSummaryComponent', () => {
  let component: ShakemapSummaryComponent;
  let fixture: ComponentFixture<ShakemapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakemapSummaryComponent,
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
    fixture = TestBed.createComponent(ShakemapSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
