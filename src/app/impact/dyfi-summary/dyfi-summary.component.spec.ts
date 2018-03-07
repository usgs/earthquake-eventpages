import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { DyfiSummaryComponent } from './dyfi-summary.component';
import { MockComponent } from 'ng2-mock-component';

describe('DyfisummaryComponent', () => {
  let component: DyfiSummaryComponent;
  let fixture: ComponentFixture<DyfiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiSummaryComponent,
        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']})
      ],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
