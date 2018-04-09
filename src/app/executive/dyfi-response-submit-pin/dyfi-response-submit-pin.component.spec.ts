import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';

import { DyfiResponseSubmitPinComponent } from './dyfi-response-submit-pin.component';
import { FormatterService } from '../../core/formatter.service';

describe('DyfiResponseSubmitPinComponent', () => {
  let component: DyfiResponseSubmitPinComponent;
  let fixture: ComponentFixture<DyfiResponseSubmitPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiResponseSubmitPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'link',
            'product',
            'title',
            'footer'
          ]
        }),

        MockPipe('dyfiCounter')
      ],
      providers: [
        FormatterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiResponseSubmitPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
