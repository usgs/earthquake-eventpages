import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeDetailComponent } from './magnitude-detail.component';
import { MatDialogModule, MatTableModule } from '@angular/material';

describe('MagnitudeDetailComponent', () => {
  let component: MagnitudeDetailComponent;
  let fixture: ComponentFixture<MagnitudeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      declarations: [
        MagnitudeDetailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
