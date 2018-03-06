import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { PagerSummaryComponent } from './pager-summary.component';
import { MockComponent } from 'ng2-mock-component';

describe('PagerSummaryComponent', () => {
  let component: PagerSummaryComponent;
  let fixture: ComponentFixture<PagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerSummaryComponent,
        MockComponent({selector: 'shared-alert-level', inputs: ['alert']})
      ],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule
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
