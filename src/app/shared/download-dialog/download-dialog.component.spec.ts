import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';

import { DownloadDialogComponent } from './download-dialog.component';

describe('DownloadDialogComponent', () => {
  let component: DownloadDialogComponent;
  let fixture: ComponentFixture<DownloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadDialogComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
