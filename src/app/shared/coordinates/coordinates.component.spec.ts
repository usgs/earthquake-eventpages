import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesComponent } from './coordinates.component';

import { FormatterService } from '../../formatter.service';


describe('CoordinatesComponent', () => {
  let component: CoordinatesComponent;
  let fixture: ComponentFixture<CoordinatesComponent>;

  beforeEach(async(() => {
    const formatterServiceStub = {
      latitude: jasmine.createSpy('formatter::latitude'),
      longitude: jasmine.createSpy('formatter::longitude')
    };

    TestBed.configureTestingModule({
      declarations: [
        CoordinatesComponent
      ],
      providers: [
        {provide: FormatterService, useValue: formatterServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
