import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';
import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed.component';

describe('ShakeAlertConfirmedComponent', () => {
  let component: ShakeAlertConfirmedComponent;
  let fixture: ComponentFixture<ShakeAlertConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeAlertConfirmedComponent, MockPipe('sharedDateTime')]
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
