import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'app/mock-pipe';
import { MockComponent } from 'ng2-mock-component';

import { GroundFailurePinComponent } from './ground-failure-pin.component';

describe('GroundFailurePinComponent', () => {
  let component: GroundFailurePinComponent;
  let fixture: ComponentFixture<GroundFailurePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroundFailurePinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['alert', 'areaAlert', 'populationAlert'],
          selector: 'shared-ground-failure-landslide-icon'
        }),
        MockComponent({
          inputs: ['alert', 'areaAlert', 'populationAlert'],
          selector: 'shared-ground-failure-liquefaction-icon'
        }),
        MockPipe('sharedProductProperty')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailurePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
