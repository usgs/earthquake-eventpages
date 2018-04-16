import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardAlertComponent } from './hazard-alert.component';
import { MockComponent } from 'ng2-mock-component';

describe('HazardAlertComponent', () => {
  let component: HazardAlertComponent;
  let fixture: ComponentFixture<HazardAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HazardAlertComponent,

        MockComponent({selector: 'ground-failure-alert-bar', inputs: ['bins', 'title', 'units', 'value']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
