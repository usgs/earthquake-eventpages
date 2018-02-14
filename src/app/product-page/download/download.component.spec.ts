import { async, getTestBed, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DownloadComponent } from './download.component';

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let httpClient: HttpTestingController;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
