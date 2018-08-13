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
      imports: [MatTableModule, RouterModule],
      declarations: [
        ShakemapSummaryComponent,
        MockComponent({
          selector: 'shared-mmi',
          inputs: ['intensity']
        }),
        MockComponent({
          selector: 'shared-product-attribution',
          inputs: ['product']
        }),
        MockComponent({
          selector: 'shared-preferred-check',
          inputs: ['TITLE']
        })
      ]
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
