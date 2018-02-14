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

  it('should return same product that was set', () => {
    const product = {};
    component.product = product;
    expect(component.product).toBe(product);
  });

  it('should update contents after set', async() => {
    component.product = {
      contents: {
        'contents.xml': {
          url: 'test contents url'
        }
      }
    };
    component.contents$.subscribe((content) => {
      expect(content).toBe('test contents url');
    });
  });

  it('should clear contents when there is no contents.xml', async () => {
    component.product = {
      contents: {}
    };
    component.contents$.subscribe((content) => {
      expect(content).toBe(false);
    });
  });

});
