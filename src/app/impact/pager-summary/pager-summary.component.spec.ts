import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng2-mock-component';

import { PagerSummaryComponent } from './pager-summary.component';


describe('PagerSummaryComponent', () => {
  let component: PagerSummaryComponent;
  let fixture: ComponentFixture<PagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        RouterModule
      ],
      declarations: [
        PagerSummaryComponent,
        MockComponent({
          selector: 'shared-alert-level',
          inputs: ['alert']
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
