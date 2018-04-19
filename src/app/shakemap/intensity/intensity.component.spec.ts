import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { IntensityComponent } from './intensity.component';

describe('IntensityComponent', () => {
  let component: IntensityComponent;
  let fixture: ComponentFixture<IntensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IntensityComponent,
        MockComponent({
          selector: 'shakemap-map',
          inputs: [
            'overlayEnabled'
          ]
       })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
