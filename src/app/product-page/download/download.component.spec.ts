import { async, getTestBed, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockComponent } from 'ng2-mock-component';

import { ContentsXmlService } from '../../contents-xml.service';
import { DownloadComponent } from './download.component';


describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let httpClient: HttpTestingController;
  let injector: TestBed;

  beforeEach(async(() => {
    const contentsXmlServiceStub = {
      get: jasmine.createSpy('contentsXmlServiceStub::get')
    };

    TestBed.configureTestingModule({
      declarations: [
        DownloadComponent,

        MockComponent({selector: 'mat-expansion-panel'}),
        MockComponent({selector: 'mat-expansion-panel-header'}),
        MockComponent({selector: 'product-page-download-item', inputs: ['item']})
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: ContentsXmlService, useValue: contentsXmlServiceStub}
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

  describe('get/set product', () => {
    it('should return same product that was set', () => {
      const product = {};
      component.product = product;
      expect(component.product).toBe(product);
    });
  });

  describe('opened/closed', () => {
    it('is initially closed', () => {
      expect(component.isOpen()).toBe(false);
    });

    it('is opened after openining', () => {
      component.onOpen();
      expect(component.isOpen()).toBe(true);
    });

    it('is closed after closing', () => {
      component.onOpen();
      component.onClose();
      expect(component.isOpen()).toBe(false);
    });
  });

  // it('should update contents after set', async() => {
  //   component.product = {
  //     contents: {
  //       'contents.xml': {
  //         url: 'test contents url'
  //       }
  //     }
  //   };
  //   component.contents$.subscribe((content) => {
  //     expect(content).toBe('test contents url');
  //   });
  // });

  // it('should clear contents when there is no contents.xml', async () => {
  //   component.product = {
  //     contents: {}
  //   };
  //   component.contents$.subscribe((content) => {
  //     expect(content).toBe(false);
  //   });
  // });

});
