import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';

import { ShakemapSummaryComponent } from './shakemap-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { RouterModule } from '@angular/router';

describe('ShakeMapSummaryComponent', () => {
  let component: ShakemapSummaryComponent;
  let fixture: ComponentFixture<ShakemapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        RouterModule
      ],
      declarations: [
        ShakemapSummaryComponent,
        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),
        MockComponent({selector: 'shared-preferred-check', inputs: ['TITLE']})
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
