import {
  async,
  getTestBed,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { ContentsXmlService } from '../../core/contents-xml.service';
import { DownloadComponent } from './download.component';


describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;

  beforeEach(async(() => {
    const contentsXmlServiceStub = {
      get: jasmine.createSpy('contentsXmlServiceStub::get')
    };

    TestBed.configureTestingModule({
      declarations: [
        DownloadComponent,

        MockComponent({selector: 'mat-expansion-panel'}),
        MockComponent({selector: 'mat-expansion-panel-header'}),
        MockComponent({selector: 'product-page-download-item',
            inputs: ['item']})
      ],
      providers: [
        {provide: ContentsXmlService, useValue: contentsXmlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

    it('auto-loads when open on set', () => {
      component.onOpen();
      spyOn(component, 'loadContentsXml');
      component.product = {};

      expect(component.loadContentsXml).toHaveBeenCalled();
    });

    it('uses phasedata when set', () => {
      component.onOpen();
      component.product = {
        phasedata: {}
      };
      expect(component.contentsXmlService.get).toHaveBeenCalledWith(
          component.product.phasedata);
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
});
