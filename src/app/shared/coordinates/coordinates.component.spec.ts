import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterService } from '../../core/formatter.service';
import { CoordinatesComponent } from './coordinates.component';

describe('CoordinatesComponent', () => {
  let component: CoordinatesComponent;
  let fixture: ComponentFixture<CoordinatesComponent>;

  beforeEach(async(() => {
    const formatterServiceStub = {
      latitude: jasmine.createSpy('formatter::latitude'),
      longitude: jasmine.createSpy('formatter::longitude')
    };

    TestBed.configureTestingModule({
      declarations: [CoordinatesComponent],
      providers: [{ provide: FormatterService, useValue: formatterServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters/setters', () => {
    it('parses to float', () => {
      const latStr = '0.0';
      const lngStr = '-0.0';

      component.latitude = latStr;
      component.longitude = lngStr;

      expect(component.latitude).toBe(0.0);
      expect(component.longitude).toBe(0.0);
    });
  });
});
