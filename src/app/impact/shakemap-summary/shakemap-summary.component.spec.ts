import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { ShakemapSummaryComponent } from './shakemap-summary.component';
import { MockComponent } from 'ng2-mock-component';

describe('ShakeMapSummaryComponent', () => {
  let component: ShakemapSummaryComponent;
  let fixture: ComponentFixture<ShakemapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakemapSummaryComponent,
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
    fixture = TestBed.createComponent(ShakemapSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
