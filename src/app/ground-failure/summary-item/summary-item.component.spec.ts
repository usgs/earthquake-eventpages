import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SummaryItemComponent } from './summary-item.component';
import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';

describe('SummaryItemComponent', () => {
  let component: SummaryItemComponent;
  let fixture: ComponentFixture<SummaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SummaryItemComponent,

        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-hazard-alert'
        }),
        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-population-alert'
        }),
        MockPipe('pending'),
        MockPipe('sharedProductProperty')
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
