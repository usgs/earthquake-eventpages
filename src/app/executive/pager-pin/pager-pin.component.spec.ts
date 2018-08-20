import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { PagerPinComponent } from './pager-pin.component';

describe('PagerPinComponent', () => {
  let component: PagerPinComponent;
  let fixture: ComponentFixture<PagerPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['alert'],
          selector: 'shared-alert-level'
        }),

        MockPipe('sharedProductContent')
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
