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
          inputs: ['bins', 'title', 'units', 'value', 'error'],
          selector: 'ground-failure-alert-bar'
        }),
        MockComponent({
          inputs: ['alert', 'areaAlert', 'badge', 'caption', 'populationAlert'],
          selector: 'shared-ground-failure-landslide-badge'
        }),
        MockComponent({
          inputs: ['alert', 'areaAlert', 'badge', 'caption', 'populationAlert'],
          selector: 'shared-ground-failure-liquefaction-badge'
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
