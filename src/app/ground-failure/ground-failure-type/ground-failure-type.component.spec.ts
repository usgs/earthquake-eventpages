import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureTypeComponent } from './ground-failure-type.component';
import { MockComponent } from 'ng2-mock-component';

describe('GroundFailureTypeComponent', () => {
  let component: GroundFailureTypeComponent;
  let fixture: ComponentFixture<GroundFailureTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroundFailureTypeComponent,

        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-hazard-alert'
        }),
        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-population-alert'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
