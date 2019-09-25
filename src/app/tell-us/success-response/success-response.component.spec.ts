import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { SuccessResponseComponent } from './success-response.component';
import { WindowRef } from '@shared/window-ref-wrapper';
import { MockPipe } from 'app/mock-pipe';

declare let window: any;

describe('SuccessResponseComponent', () => {
  const nativeWindowRef = new WindowRef();

  let component: SuccessResponseComponent;
  let fixture: ComponentFixture<SuccessResponseComponent>;

  beforeEach(async(() => {
    // override for testing
    SuccessResponseComponent.FB_SDK_URL = '';

    TestBed.configureTestingModule({
      declarations: [
        SuccessResponseComponent,
        MockPipe('sharedRomanToNumber'),
        MockComponent({
          inputs: ['bubble', 'intensity', 'value'],
          selector: 'shared-mmi'
        })
      ],
      providers: [
        { provide: WindowRef, useValue: nativeWindowRef }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessResponseComponent);
    component = fixture.componentInstance;
    component.response = {
      ciim_mapLat: '10',
      ciim_mapLon: '20',
      ciim_time: 'now',
      eventid: 'testEventID',
      form_version: '1.1.1',
      your_cdi: '3'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('sets meta tags on component', () => {
      const metaUrl = component.meta.getTag('property="og:url"').content;
      const metaType = component.meta.getTag('property="og:type"').content;
      const metaTitle = component.meta.getTag('property="og:title"').content;
      expect(metaUrl).toEqual(component._windowHref);
      expect(metaType).toEqual('website');
      expect(metaTitle).toEqual('');
    });
    it('calls LoadFacebookSDK', () => {
      spyOn(component, 'loadFacebookSdk');
      component.ngOnInit();
      expect(component.loadFacebookSdk).toHaveBeenCalled();
    });
  });

  describe('onSocialClick', () => {
    it('calls share popup on social click', () => {
      spyOn(component, 'showFacebookSharePopup');
      const event = {
        preventDefault: function() {}
      };
      component.onSocialClick(event);
      expect(component.showFacebookSharePopup).toHaveBeenCalled();
    });
  });

  describe('showFacebookSharePopup', () => {
    it('calls showFacebookPopup and ensures FB.ui is called', () => {
      component.sdkStatus = true;
      window.FB = {
        ui: jasmine.createSpy().and.returnValue(null)
      };
      component.showFacebookSharePopup();
      expect(window.FB.ui).toHaveBeenCalled();
    });
  });
});
