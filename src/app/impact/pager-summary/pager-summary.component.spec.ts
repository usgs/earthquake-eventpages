import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { PagerSummaryComponent } from './pager-summary.component';
import { FormatterService } from '../../formatter.service';

describe('PagerSummaryComponent', () => {
  let component: PagerSummaryComponent;
  let fixture: ComponentFixture<PagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerSummaryComponent
      ],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule
      ],
      providers: [
        FormatterService
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
