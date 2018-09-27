import { MockPipe } from './../../mock-pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteFaultMapPopupComponent } from './finite-fault-map-popup.component';

describe('FiniteFaultMapPopupComponent', () => {
  let component: FiniteFaultMapPopupComponent;
  let fixture: ComponentFixture<FiniteFaultMapPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiniteFaultMapPopupComponent,
        MockPipe('sharedNumber'),
        MockPipe('sharedDegrees')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets all inputs properly', () => {
    component.color = '#FFFFFF';
    component.moment = '10e15 N-m';
    component.rake = 4;
    component.rise = 3;
    component.slip = 2;
    component.trup = 1;
    expect(component.color).toEqual('#FFFFFF');
    expect(component.moment).toEqual('10e15 N-m');
    expect(component.rake).toEqual(4);
    expect(component.rise).toEqual(3);
    expect(component.slip).toEqual(2);
    expect(component.trup).toEqual(1);
  });
});
