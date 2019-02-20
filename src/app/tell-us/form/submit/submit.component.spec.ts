import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitComponent } from './submit.component';
import { MockComponent } from 'ng2-mock-component';

describe('SubmitComponent', () => {
  let component: SubmitComponent;
  let fixture: ComponentFixture<SubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmitComponent,
        MockComponent({
          inputs: ['diameter'],
          selector: 'mat-spinner'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
