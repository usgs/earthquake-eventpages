import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { PopulationAlertComponent } from './population-alert.component';

describe('PopulationAlertComponent', () => {
  let component: PopulationAlertComponent;
  let fixture: ComponentFixture<PopulationAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PopulationAlertComponent,

        MockComponent({
          inputs: ['bins', 'title', 'units', 'value'],
          selector: 'ground-failure-alert-bar'
        })
      ]
    }).compileComponents();
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
