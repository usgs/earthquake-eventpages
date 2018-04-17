import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationAlertComponent } from './population-alert.component';
import { MockComponent } from 'ng2-mock-component';

describe('PopulationAlertComponent', () => {
  let component: PopulationAlertComponent;
  let fixture: ComponentFixture<PopulationAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PopulationAlertComponent,

        MockComponent({selector: 'ground-failure-alert-bar', inputs: ['bins', 'title', 'units', 'value']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
