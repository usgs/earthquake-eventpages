import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { PagerSummaryComponent } from './pager-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { RouterModule } from '@angular/router';

describe('PagerSummaryComponent', () => {
  let component: PagerSummaryComponent;
  let fixture: ComponentFixture<PagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        RouterModule
      ],
      declarations: [
        PagerSummaryComponent,
        MockComponent({selector: 'shared-alert-level', inputs: ['alert']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),
        MockComponent({selector: 'shared-preferred-check', inputs: ['TITLE']})
      ],
      providers: [
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
