import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';
import { DownloadItemComponent } from './download-item.component';

describe('DownloadItemComponent', () => {
  let component: DownloadItemComponent;
  let fixture: ComponentFixture<DownloadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DownloadItemComponent,

        MockPipe('fileSize')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
