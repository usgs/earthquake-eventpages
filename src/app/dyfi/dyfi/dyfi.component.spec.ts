import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { DyfiComponent } from './dyfi.component';

describe('DyfiComponent', () => {
  let component: DyfiComponent;
  let fixture: ComponentFixture<DyfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DyfiComponent,

        MockComponent({ selector: 'product-page', inputs: ['productType'] }),
        MockComponent({ selector: 'mdc-icon' }),
        MockComponent({ selector: 'mdc-tab-bar-scroller' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-back' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-frame' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-forward' })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
