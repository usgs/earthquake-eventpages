import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComponent } from './location.component';
import { MockComponent } from 'ng2-mock-component';
import { FormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { of } from 'rxjs/observable/of';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { FormatterService } from '@core/formatter.service';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      coordinates$: of({})
    };
    const formatterServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [
        LocationComponent,
        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        }),
        MockComponent({
          inputs: ['event', 'labels', 'feltReport', 'location'],
          selector: 'tell-us-form-location-map'
        })
      ],
      imports: [
        FormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: FormatterService, useValue: formatterServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
