import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '@core/formatter.service';
import { OriginSummaryComponent } from './origin-summary.component';

describe('OriginSummaryComponent', () => {
  let component: OriginSummaryComponent;
  let fixture: ComponentFixture<OriginSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginSummaryComponent,

        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
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
    fixture = TestBed.createComponent(OriginSummaryComponent);
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
