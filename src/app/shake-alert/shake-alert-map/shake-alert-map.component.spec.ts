import { MockComponent } from 'ng2-mock-component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from './../../mock-pipe';

import { ShakeAlertMapComponent } from './shake-alert-map.component';

describe('ShakeAlertMapComponent', () => {
  let component: ShakeAlertMapComponent;
  let fixture: ComponentFixture<ShakeAlertMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertMapComponent,
        MockComponent({
          inputs: ['overlays', 'bounds', 'showScaleControl'],
          selector: 'shared-map'
        }),
        MockPipe('shakeAlertMapOverlays')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
