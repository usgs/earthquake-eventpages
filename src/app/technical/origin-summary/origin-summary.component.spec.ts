import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginSummaryComponent } from './origin-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { FormatterService } from '../../formatter.service';
import { MatTableModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('OriginSummaryComponent', () => {
  let component: OriginSummaryComponent;
  let fixture: ComponentFixture<OriginSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [
        OriginSummaryComponent,

        MockComponent({selector: 'shared-product-attribution', inputs: ['product']})
      ],
      providers: [
        FormatterService
      ]
    })
    .compileComponents();
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
      expect(component.toDate('2017-01-01T00:00:00Z').toISOString()).toEqual('2017-01-01T00:00:00.000Z');
    });
  });
});
