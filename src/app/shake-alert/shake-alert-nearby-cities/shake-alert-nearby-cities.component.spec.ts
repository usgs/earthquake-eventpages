import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { MockPipe } from '../../mock-pipe';

import { ShakeAlertNearbyCitiesComponent } from './shake-alert-nearby-cities.component';

describe('ShakeAlertNearbyCitiesComponent', () => {
  let component: ShakeAlertNearbyCitiesComponent;
  let fixture: ComponentFixture<ShakeAlertNearbyCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertNearbyCitiesComponent,

        MockPipe('sharedDistance'),
        MockPipe('sharedNumber'),
        MockPipe('sharedProductProperty'),
        MockPipe('sharedRoman'),
        MockPipe('sharedUnits')
      ],
      imports: [MatTableModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertNearbyCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
