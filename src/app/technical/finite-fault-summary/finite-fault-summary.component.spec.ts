import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';

import { FiniteFaultSummaryComponent } from './finite-fault-summary.component';


describe('FiniteFaultSummaryComponent', () => {
  let component: FiniteFaultSummaryComponent;
  let fixture: ComponentFixture<FiniteFaultSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiniteFaultSummaryComponent,

        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockComponent({
          inputs: ['TITLE'],
          selector: 'shared-preferred-check'
        }),
        MockPipe('sharedNumber')
      ],
      imports: [
        MatIconModule,
        MatTableModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
