import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';

import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed.component';

describe('ShakeAlertConfirmedComponent', () => {
  let component: ShakeAlertConfirmedComponent;
  let fixture: ComponentFixture<ShakeAlertConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertConfirmedComponent,
        MockComponent({
          inputs: ['cities'],
          selector: 'shake-alert-nearby-cities'
        }),
        MockComponent({
          inputs: ['summary'],
          selector: 'shake-alert-summary-report'
        }),
        MockComponent({
          inputs: ['alert', 'caption'],
          selector: 'shake-alert-map'
        }),
        MockPipe('sharedDateTime')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
