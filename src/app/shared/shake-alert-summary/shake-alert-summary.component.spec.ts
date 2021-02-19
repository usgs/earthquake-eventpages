import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertSummaryComponent } from './shake-alert-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { FormatterService } from '@core/formatter.service';

describe('ShakeAlertSummaryComponent', () => {
  let component: ShakeAlertSummaryComponent;
  let fixture: ComponentFixture<ShakeAlertSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertSummaryComponent,

        MockComponent({
          inputs: ['TITLE'],
          selector: 'shared-preferred-check'
        })
      ],
      imports: [MatIconModule, MatTableModule, RouterTestingModule],
      providers: [FormatterService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toDate', () => {
    it('converts strings to dates', () => {
      expect(component.toDate('2017-01-01T00:00:00Z').toISOString()).toEqual(
        '2017-01-01T00:00:00.000Z'
      );
    });
  });
});
