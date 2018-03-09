import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { DyfiSummaryComponent } from './dyfi-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { RouterModule } from '@angular/router';

describe('DyfisummaryComponent', () => {
  let component: DyfiSummaryComponent;
  let fixture: ComponentFixture<DyfiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        RouterModule
      ],
      declarations: [
        DyfiSummaryComponent,
        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),
        MockComponent({selector: 'shared-preferred-check', inputs: ['TITLE']})
      ],
      providers: [
      ]
    })
    .compileComponents();
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
