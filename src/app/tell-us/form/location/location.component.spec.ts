import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { LocationComponent } from './location.component';
import { FormatterService } from '@core/formatter.service';
import { GeoService, LocationError } from '@shared/geo.service';
import { MockPipe } from 'app/mock-pipe';

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
    const geoServiceStub = {
      error$: of({
        code: -1,
        message: 'test'
      } as LocationError)
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
        { provide: MatSnackBar, useValue: snackBarStub },
        { provide: FormatterService, useValue: formatterServiceStub },
        { provide: GeoService, useValue: geoServiceStub }
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

  describe('ngOnInit', () => {
    it('sets up subscription that calls openSnackBar', () => {
      spyOn(component, 'openSnackBar');
      component.ngOnInit();
      expect(component.openSnackBar).toHaveBeenCalled();
      expect(component.openSnackBar).toHaveBeenCalledWith('test', 'close');
    });
  });

  describe('ngOnDestroy', () => {
    it('removes subscription to geoservice', () => {
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
