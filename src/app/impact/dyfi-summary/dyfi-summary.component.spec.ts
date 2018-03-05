import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { DyfiSummaryComponent } from './dyfi-summary.component';
import { FormatterService } from '../../formatter.service';

describe('DyfisummaryComponent', () => {
  let component: DyfiSummaryComponent;
  let fixture: ComponentFixture<DyfiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiSummaryComponent
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
    fixture = TestBed.createComponent(DyfiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
