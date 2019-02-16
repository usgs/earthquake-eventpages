import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalComponent } from './optional.component';
import { MockComponent } from 'ng2-mock-component';

describe('OptionalComponent', () => {
  let component: OptionalComponent;
  let fixture: ComponentFixture<OptionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OptionalComponent,

        MockComponent({
          inputs: [
            'label',
            'labels',
            'model',
            'multiSelect',
            'name',
            'options'
          ],
          selector: 'tell-us-question'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
