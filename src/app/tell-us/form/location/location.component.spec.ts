import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockComponent } from 'ng2-mock-component';

import { LocationComponent } from './location.component';
import { GeoService } from '@shared/geo.service';
import { MockPipe } from 'app/mock-pipe';
import { FormatterService } from '@core/formatter.service';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    const formatterServiceStub = {
      address: jasmine.createSpy('FormatterService::address'),
      number: jasmine.createSpy('FormatterService::number')
    };
    const snackBarStub = {
      open: jasmine.createSpy('snackBar::open')
    };

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
          selector: 'mat-expansion-panel'
        }),

        MockPipe('locationPipe')
      ],
      imports: [HttpClientTestingModule],
      providers: [
        GeoService,
        { provide: MatSnackBar, useValue: snackBarStub },
        { provide: FormatterService, useValue: formatterServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openSnackBar', () => {
    it('generates a snackbar message', () => {
      const message = 'message';
      const action = 'action';
      const length = 1000;

      component.openSnackBar(message, action, length);
      expect(component.snackBar.open).toHaveBeenCalled();
      expect(component.snackBar.open).toHaveBeenCalledWith(message, action, {
        duration: length
      });
    });
  });
});
