import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { ContentsXmlService } from '@core/contents-xml.service';
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

        MockComponent({
          inputs: ['expanded'],
          selector: 'mat-expansion-panel'
        }),
        MockComponent({ selector: 'mat-expansion-panel-header' }),
        MockComponent({
          inputs: ['item'],
          selector: 'product-page-download-item'
        })
      ],
      providers: [
        { provide: ContentsXmlService, useValue: contentsXmlServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadContentsXml', () => {
    it('calls contents xml service with correct product', () => {
      component.product = {};

      component.loadContentsXml();

      expect(component.contentsXmlService.get).toHaveBeenCalledWith(
        component.product
      );
    });

    it('uses phasedata when set', () => {
      const phasedata = {};
      component.product = {
        phasedata: phasedata
      };

      component.loadContentsXml();

      expect(component.contentsXmlService.get).toHaveBeenCalledWith(phasedata);
    });
  });
});
