import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { FiniteFaultPinComponent } from './finite-fault-pin.component';

describe('FiniteFaultPinComponent', () => {
  let component: FiniteFaultPinComponent;
  let fixture: ComponentFixture<FiniteFaultPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiniteFaultPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),

        MockPipe('sharedProductContent')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
