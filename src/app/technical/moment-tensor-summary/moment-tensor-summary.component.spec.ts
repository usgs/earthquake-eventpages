import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTensorSummaryComponent } from './moment-tensor-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { MatTableModule, MatIconModule } from '@angular/material';
import { FormatterService } from '../../formatter.service';

describe('MomentTensorSummaryComponent', () => {
  let component: MomentTensorSummaryComponent;
  let fixture: ComponentFixture<MomentTensorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule
      ],
      declarations: [
        MomentTensorSummaryComponent,

        MockComponent({selector: 'shared-beachball', inputs: ['fillColor', 'labelAxes', 'labelPlanes', 'size', 'tensor']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']})
      ],
      providers: [
        FormatterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTensorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
