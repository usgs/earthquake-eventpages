import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { OptionalComponent } from './optional.component';
import { MockPipe } from 'app/mock-pipe';

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
        }),
        MockPipe('keys')
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
