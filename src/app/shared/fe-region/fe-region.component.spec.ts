import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeRegionComponent } from './fe-region.component';

import { GeoserveService } from '../../geoserve.service';


describe('FeRegionComponent', () => {
  let component: FeRegionComponent;
  let fixture: ComponentFixture<FeRegionComponent>;

  beforeEach(async(() => {
    const geoserveServiceStub = {
    };

    TestBed.configureTestingModule({
      declarations: [
        FeRegionComponent
      ],
      providers: [
        {provide: GeoserveService, useValue: geoserveServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
