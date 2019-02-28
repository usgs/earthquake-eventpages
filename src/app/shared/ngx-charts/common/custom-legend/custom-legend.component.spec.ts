import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { CustomLegendComponent } from './custom-legend.component';

describe('CustomLegendComponent', () => {
  let component: CustomLegendComponent;
  let fixture: ComponentFixture<CustomLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomLegendComponent,

        MockComponent({
          inputs: [
            'label',
            'formattedLabel',
            'color',
            'shape',
            'isActive'
          ],
          selector: 'ngx-charts-custom-legend-entry'
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
