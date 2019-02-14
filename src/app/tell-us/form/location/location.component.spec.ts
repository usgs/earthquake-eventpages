import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { LocationComponent } from './location.component';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { FormatterService } from '@core/formatter.service';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocationComponent,
        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        }),
        MockComponent({
          inputs: ['diameter'],
          selector: 'mat-spinner'
        }),
        MockComponent({
          selector: 'mat-icon'
        }),
        MockComponent({
          inputs: ['ngModel'],
          selector: 'input'
        }),
        MockComponent({
          selector: 'mat-form-field'
        }),
        MockComponent({
          selector: 'mat-expansion-panel-header'
        }),
        MockComponent({
          inputs: ['event', 'labels', 'feltReport'],
          selector: 'tell-us-form-location-map'
        }),
        MockComponent({
          selector: 'mat-expansion-panel'
        })
      ],
      providers: [CoordinatesService, FormatterService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
