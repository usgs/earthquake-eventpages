import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { MockPipe } from '../../mock-pipe';
import { ForecastNumberTableComponent } from './forecast-number-table.component';

describe('ForecastNumberTableComponent', () => {
  let component: ForecastNumberTableComponent;
  let fixture: ComponentFixture<ForecastNumberTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastNumberTableComponent,

        MockPipe('oafPercent'),
        MockPipe('sharedNumberWithSeparator'),
        MockPipe('sharedRoundDown'),
        MockPipe('sharedRoundUp')
      ],
      imports: [MatTableModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastNumberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
