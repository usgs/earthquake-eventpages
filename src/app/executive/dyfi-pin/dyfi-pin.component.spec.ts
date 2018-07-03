import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

import { DyfiPinComponent } from './dyfi-pin.component';

describe('DyfiPinComponent', () => {
  let component: DyfiPinComponent;
  let fixture: ComponentFixture<DyfiPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiPinComponent,

        MockComponent({selector: 'basic-pin', inputs: ['link', 'title', 'product']}),
        MockComponent({selector: 'shared-mmi', inputs: ['bubble', 'intensity']}),
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
