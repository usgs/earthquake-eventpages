import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../../mock-pipe';
import { FiniteFaultDetailComponent } from './detail.component';

describe('FiniteFaultComponent', () => {
  let component: FiniteFaultDetailComponent;
  let fixture: ComponentFixture<FiniteFaultDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiniteFaultDetailComponent,

        MockComponent({
          inputs: ['product', 'contentPath'],
          selector: 'shared-text-product'
        }),
        MockComponent({
          inputs: ['segments'],
          selector: 'result-table'
        }),

        MockPipe('createSegments'),
        MockPipe('sharedDegrees'),
        MockPipe('sharedLocation'),
        MockPipe('sharedNumber'),
        MockPipe('sharedProductContent'),
        MockPipe('sharedProductProperty')
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
